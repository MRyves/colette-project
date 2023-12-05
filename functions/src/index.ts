/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import {onDocumentCreated, onDocumentDeleted} from
  "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";

// Tutorial: https://firebase.google.com/docs/firestore/solutions/aggregation#solution_write-time_aggregation_with_cloud_functions

initializeApp();
const db = getFirestore();

const updateBlogRating = (
  blogRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  ratingValue: number
) => {
  return db.runTransaction(async (transaction) => {
    const blogDoc = await transaction.get(blogRef);

    const oldRatingsCount = blogDoc.data()!.ratingsCount || 0;
    const oldAvgRating = blogDoc.data()!.avgRating || 0;

    // new ratings count:
    const newRatingsCount = ratingValue < 0 ?
      oldRatingsCount - 1 : oldRatingsCount + 1;

    if (newRatingsCount <= 0) {
      transaction.update(blogRef, {
        avgRating: null,
        ratingsCount: 0,
      });
      return;
    }

    // compute new avg rating:
    const oldRatingTotal = oldRatingsCount * oldAvgRating;
    const newAvgRating = (oldRatingTotal + ratingValue) / newRatingsCount;

    transaction.update(blogRef, {
      avgRating: newAvgRating,
      ratingsCount: newRatingsCount,
    });
  });
};
export const onCommentsWritten = onDocumentCreated(
  "blogs/{blogid}/comments/{commentId}", async (event) => {
    logger.info("onCommentsWritten, blogId: ", event.params.blogid);
    logger.info("onCommentsWritten, commentsId: ", event.params.commentId);

    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No data associated with the event");
      return;
    }
    const ratingValue = snapshot.data().rating;

    const blogRef = db.collection("blogs").doc(event.params.blogid);

    await updateBlogRating(blogRef, ratingValue);
  });

export const onCommentsDeleted = onDocumentDeleted(
  "blogs/{blogid}/comments/{commentId}",
  async (event) => {
    logger.info("onCommentsDeleted, blogId: ", event.params.blogid);
    logger.info("onCommentsDeleted, commentsId: ", event.params.commentId);

    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No data associated with the event");
      return;
    }
    const ratingValue = snapshot.data().rating * -1;

    const blogRef = db.collection("blogs").doc(event.params.blogid);
    await updateBlogRating(blogRef, ratingValue);
  }
);
