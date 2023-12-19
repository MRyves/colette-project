import Blog from '../models/Blog';
import { useState } from 'react';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import blogsService from '../services/blogs.service';
import { DocumentSnapshot } from '@firebase/firestore';


function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertDocToBlog = (doc: DocumentSnapshot): Blog => {
    const documentData = doc.data();
    if (documentData) {
      return {
        uid: doc.id,
        title: documentData.title,
        lead: documentData.lead,
        category: documentData.category,
        duration: documentData.duration,
        quantity: documentData.quantity,
        tags: documentData.tags,
        level: documentData.level,
        ingredients: documentData.ingredients,
        description: documentData.description,
        additional: documentData.additional,
        author: documentData.author,
        imgUrl: documentData.imgUrl,
        timestamp: documentData.timestamp,
        userId: documentData.userId,
        avgRating: documentData.avgRating || 0
      } as Blog;
    }
    return {} as Blog;
  };

  const queryAllBlogs = () => {
    const blogsRef = collection(db, 'blogs');
    getDocs(query(blogsRef, orderBy('timestamp', 'desc')))
      .then((data) => {
        const blogsData = data.docs.map((doc) => convertDocToBlog(doc));
        setBlogs(blogsData);
      })
      .catch((e) => {
        setBlogs([]);
        setError(e.message);
      });
  };

  const querySingleBlog = (uid: string) => {
    const blogRef = doc(db, 'blogs', uid);
    getDoc(blogRef)
      .then((blogDetail) => {
        setBlogs([convertDocToBlog(blogDetail)]);
      })
      .catch((error) => {
        setError((error as Error).message);
      });
  };

  const queryCategoryBlog = (category: string) => {
    setLoading(true);
    const blogsRef = collection(db, 'blogs');
    const categoryQuery = query(
      blogsRef,
      where('category', '==', category),
      orderBy('timestamp', 'desc')
    );

    getDocs(categoryQuery)
      .then((data) => {
        const blogsData = data.docs.map((doc) => convertDocToBlog(doc));
        setBlogs(blogsData);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const queryBlogs = ({ uid, category }: {
    uid?: string;
    category?: string;
  } = {}) => {
    setLoading(true);
    if (!uid && !category) {
      queryAllBlogs();
    } else if (uid && !category) {
      querySingleBlog(uid);
    } else if (category) {
      queryCategoryBlog(category);
    }
    setLoading(false);
  };




  const deleteBlog = async (uid: string) => {
    try {
      await blogsService.deleteBlog(uid);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.uid !== uid));
    } catch (e) {
      setError((e as Error).message);
    }
  };


  return {
    blogs,
    queryBlogs,
    querySingleBlog,
    deleteBlog,
    loading,
    error
  };
}

export default useBlogs;
