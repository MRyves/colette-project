// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { useState } from 'react';
// import { db } from '../firebase-config';

// function useComments() {
//     const [comments, setComments] = useState<{ uid: string; nickname: string; comment: string; }[] | null>(null);
//     const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const queryAllComments = (blogId: string) => {
//     const commentsRef = collection(db, 'blogs', blogId, 'comments');
//     getDocs(commentsRef)
//       .then((data) => {
//         const commentsData: { uid: string; nickname: string; comment: string; }[] = data.docs.map((doc) => ({
//           uid: doc.id,
//           ...doc.data(),
//         }));
//         setComments(commentsData);
//       })
//       .catch((e) => {
//         setError(e.message);
//       });
//   };
//   const createComment = async (blogId: string, form: { nickname: string; comment: string }) => {
//     if (!blogId) return;

//     try {
//       const comment = form;
//       const commentsRef = collection(db, 'blogs', blogId, 'comments');

//       await addDoc(commentsRef, {
//         ...form,
//       });
//       setComments((prevComments) => [...prevComments, comment]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getComments = (blogId: string) => {
//     if (!blogId) {
//       return;
//     }

//     queryAllComments(blogId);
//   };

//   return {
//     comments,
//     createComment,
//     getComments,
//     loading,
//     error,
//   };
// }

// export default useComments;
