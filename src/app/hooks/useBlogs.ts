import Blog from '../models/Blog';
import { useState } from 'react';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { BlogFormState } from '../components/blog-form';

function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertDocToBlog = (doc: any): Blog => {
    const documentData = doc.data();
    return {
      uid: doc.id,
      title: documentData.title,
      category: documentData.category,
      ingredients: documentData.ingredients,
      lead: documentData.lead,
      description: documentData.description,
      tags: documentData.tags,
      duration: documentData.duration,
      author: documentData.author,
      imgUrl: documentData.imgUrl,
      timestamp: documentData.timestamp,
    } as Blog;
  };

  const queryAllBlogs = () => {
    const blogsRef = collection(db, 'blogs');
    getDocs(query(blogsRef, orderBy('timestamp', 'desc')))
      .then((data) => {
        const blogsData = data.docs.map((doc) => convertDocToBlog(doc));
        setBlogs(blogsData);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

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

  

  const queryBlogs = ({ uid, category, searchQuery }: { uid?: string; category?: string; searchQuery?: string } = {}) => {
    setLoading(true);
    if (!uid && !category && !searchQuery) {
      queryAllBlogs();
    } else if (uid && !category) {
      querySingleBlog(uid);
    } else if (category) {
      queryCategoryBlog(category);
    } else if (searchQuery) {
      querySearchBlogs(searchQuery);
    }
    setLoading(false);
  };


  const querySearchBlogs = (query: string) => {
    console.log('Suchbegriff:', query); // Überprüfe, ob der Suchbegriff korrekt übergeben wird
    const blogsRef = collection(db, 'blogs');
    const searchQuery = query.toLowerCase();
  
    getDocs(blogsRef)
    .then((data) => {
      const blogsData = data.docs
        .map((doc) => convertDocToBlog(doc))
        .filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery) ||
          blog.lead.toLowerCase().includes(searchQuery) ||
          blog.description.toLowerCase().includes(searchQuery)
        );
      console.log('Meine Suchresultate!!!!!', blogsData);
      setBlogs(blogsData);
    })      .catch((e) => {
        setError(e.message);
      });
  };



  const deleteBlog = async (uid: string) => {
    try {
      await deleteDoc(doc(db, 'blogs', uid));
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
