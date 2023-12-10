import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

export const deleteBlogFirestore = async (uid: string) => {
  try {
    await deleteDoc(doc(db, 'blogs', uid));
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
