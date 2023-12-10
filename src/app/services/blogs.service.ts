import Blog from '../models/Blog';
import { doc, updateDoc, } from 'firebase/firestore';
import { db } from '../firebase-config';

export default {

  async updateBlog(uid: string, blog: Partial<Blog>) {
    const blogRef = doc(db, 'blogs', uid);
    await updateDoc(blogRef, blog);
  }

};