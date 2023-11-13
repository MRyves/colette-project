import Blog from '../models/Blog';
import { useState } from 'react';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase-config';

function useBlogs() {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryAllBlogs = () => {
    const blogsRef = collection(db, 'blogs');
    getDocs(query(blogsRef, orderBy('timestamp', 'desc')))
      .then((data) => {
        const blogs: Blog[] = [];
        data.forEach(doc => {
          const documentData = doc.data();
          blogs.push({
            uid: doc.id,
            title: documentData.title,
            lead: documentData.lead,
            author: documentData.author,
            imgUrl: documentData.imgUrl,
            timestamp: documentData.timestamp,
            category: documentData.category
            // ....
          } as Blog);
        });
        setBlogs(blogs);
      })
      .catch(e => {
        setError(e.message);
      })
  }

  const querySingleBlog = async (uid: string) => {
    try {
    const blogRef = doc(db, 'blogs', uid);
    const blogDetail = await getDoc(blogRef);
    setBlogs([blogDetail.data() as Blog]);
    } catch (e){
      setError((e as Error).message);
    }
  }
  const queryBlogs = (uid?: string) => {
    setLoading(true);
    if (!uid) {
      queryAllBlogs();
    } else {
      querySingleBlog(uid);
    }
    setLoading(false);
  };

  const deleteBlog = async (uid: string) => {
    try {
      await deleteDoc(doc(db, 'blogs', uid));
      setBlogs(blogs.filter(blog => blog.uid !== uid));
    } catch (e) {
      setError((e as Error).message);
    }
  };


  return {
    blogs,
    queryBlogs,
    deleteBlog,
    loading,
    error
  };
}

export default useBlogs;
