import Blog from '../models/Blog';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default {

  async updateBlog(uid: string, blog: Partial<Blog>) {
    const blogRef = doc(db, 'blogs', uid);
    await updateDoc(blogRef, blog);
  },

  async deleteBlog(uid: string) {
    try {
      await deleteDoc(doc(db, 'blogs', uid));
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }


};
