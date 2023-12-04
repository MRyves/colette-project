import Blog from '../models/Blog';
import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';
import { BlogFormState } from '../components/blog-form';
import User from '../models/User';

export default {


  // deleteBlog()

  async updateBlog(uid: string, blog: Partial<Blog>) {
    const blogRef = doc(db, 'blogs', uid);
    await updateDoc(blogRef, blog);
  }

};



// export async function createBlog(form: BlogFormState, user: User | null, imgUrl: string) {
//   try {
//     // Erstelle den Blog-Eintrag in der Datenbank
//     const blogRef = await addDoc(collection(db, "blogs"), {
//       ...form,
//       imgUrl, // Füge imgUrl hinzu
//       timestamp: serverTimestamp(),
//       author: user?.displayName,
//       userId: user?.uid
//     });

//     return blogRef.id; // Gibt die ID des erstellten Blog-Eintrags zurück

//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }
