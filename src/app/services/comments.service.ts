import { Comment } from '../models/Comments';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default {
  create(blogId: string, comment: Comment) {
    const commentsRef = collection(db, 'blogs', blogId, 'comments');
    return addDoc(commentsRef, comment);
  },

  delete(blogId: string, commentId: string) {
    return deleteDoc(doc(db, 'blogs', blogId, 'comments', commentId));
  }
};
