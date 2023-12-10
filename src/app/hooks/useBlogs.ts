import Blog from '../models/Blog';
import { useState } from 'react';
import { collection, doc, getDoc, getDocs, orderBy, query,  where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { deleteBlogFirestore } from '../services/delete.service';


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
      niveau: documentData.niveau,
      ingredients: documentData.ingredients,
      lead: documentData.lead,
      description: documentData.description,
      tags: documentData.tags,
      duration: documentData.duration,
      author: documentData.author,
      imgUrl: documentData.imgUrl,
      timestamp: documentData.timestamp,
      userId: documentData.userId,
      avgRating: documentData.avgRating,
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



  const queryNiveauBlog = (niveau: string) => {
    setLoading(true);
    const blogsRef = collection(db, 'blogs');
    const niveauQuery = query(
      blogsRef,
      where('niveau', '==', niveau),
      orderBy('timestamp', 'desc')
    );


    
    getDocs(niveauQuery)
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
    console.log('Suchbegriff:', query);
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
      await deleteBlogFirestore(uid);
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
