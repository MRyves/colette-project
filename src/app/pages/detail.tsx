import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AddCommentForm from '../components/add-comment-form';
import Blog from '../models/Blog';
import { Comments } from '../models/Comments';

const Detail = () => {

  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comments>([]);
  const navigate = useNavigate();

  const createComment = async (form: any) => {
    if(!blogId)
      return;

    try {
      const comment = form;
      const commentsRef = collection(db, `blogs`, blogId, 'comments');

      await addDoc(commentsRef, {
        ...form
      });
      setComments([...comments, comment]);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    blogId && getBlogDetail();
  }, [blogId]);

  const getBlogDetail = async () => {
    if (!blogId) {
      return;
    }

    const blogRef = doc(db, 'blogs', blogId);
    const commentsRef = collection(db, `blogs`, blogId, 'comments');

    try {
      const blogDetail = await getDoc(blogRef);
      const commentsRaw = await getDocs(commentsRef);
      setBlog(blogDetail.data() as Blog);
      setComments(commentsRaw.docs.map(doc => ({
        uid: doc.id,
        nickname: doc.data().nickname,
        comment: doc.data().comment
      })));
      console.log('comments: ', commentsRaw.docs.map(doc => ({
        uid: doc.id,
        nickname: doc.data().nickname,
        comment: doc.data().comment
      })));
    } catch (error) {
      console.error('Fehler beim Abrufen von Blogdetails:', error);
    }
  };

  return (
    <div>
      <Typography align='center' variant='h1'>{blog?.title}</Typography>
      <Typography variant='caption'>by {blog?.author}</Typography>
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <CardMedia component='img' image={blog?.imgUrl} title={blog?.title} />
          <div>{blog?.description}</div>
          <AddCommentForm submitForm={createComment} />
          <Typography variant='h3'>Hier sollten die Kommentarte erscheinen.</Typography>
          {comments.map((comment) => (
            <Card key={comment.uid} variant='outlined'>
              <Typography>von {comment.nickname}</Typography>
              <Typography>{comment.comment}</Typography>
            </Card>
          ))}
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent component='div'>
              <Typography>{blog?.ingredients}</Typography>
            </CardContent>
          </Card>
          <Typography>{blog?.lead}</Typography>
          <Typography>{blog?.timestamp.toDate().toDateString()}</Typography>
          <Typography variant='caption'>by {blog?.author}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detail;
