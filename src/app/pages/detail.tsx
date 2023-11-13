import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AddCommentForm from '../components/add-comment-form';
import { Comments } from '../models/Comments';
import useBlogs from '../hooks/useBlogs';

const Detail = () => {

  const { blogId } = useParams();
  const {blogs, queryBlogs} = useBlogs();
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


  // useEffect(() => {
  //   if(blogId){
  //     queryBlogs(blogId);
  //     getComments();
  //   }
  // }, [blogId]);

  const getComments = async () => {
    if (!blogId) {
      return;
    }

    const blogRef = doc(db, 'blogs', blogId);
    const commentsRef = collection(db, `blogs`, blogId, 'comments');

    try {
      const commentsRaw = await getDocs(commentsRef);
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

  const formatTimestamp = (timestamp: any) => {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return '';
  };



  return (
    <div>
      <Typography align='center' variant='h1'>{blogs[0]?.title}</Typography>
      <Typography variant='caption'>by {blogs[0]?.author}</Typography>
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <CardMedia component='img' image={blogs[0]?.imgUrl} title={blogs[0]?.title} />
          <Typography>{blogs[0]?.timestamp ? formatTimestamp(blogs[0]?.timestamp) : ''}</Typography>
          <div>{blogs[0]?.description}</div>
          <AddCommentForm submitForm={createComment} />
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
              <Typography>{blogs[0]?.ingredients}</Typography>
            </CardContent>
          </Card>
          <Typography>{blogs[0]?.lead}</Typography>
          <Typography>{blogs[0]?.timestamp.toDate().toDateString()}</Typography>
          <Typography variant='caption'>by {blogs[0]?.author}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detail;
