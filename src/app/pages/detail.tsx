import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { Card, CardContent, CardMedia, Container, Grid, ListItem, Rating, Stack, Typography, } from '@mui/material';
import AddCommentForm, { CommentForm } from '../components/add-comment-form';
import { Comment, Comments } from '../models/Comments';
import useBlogs from '../hooks/useBlogs';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { MainContainer, TagButton, ZutatenCard } from '../theme/my-theme';
import Sharing from '../components/sharing';
import ListAltIcon from '@mui/icons-material/ListAlt';




const Detail = () => {
  const { blogId } = useParams();
  const { blogs, querySingleBlog, loading, error } = useBlogs();
  // TODO: colette, useComments()
  const [comments, setComments] = useState<Comments>([]);
  console.log(`URL: ${encodeURIComponent(window.location.href)}`);

  const createComment = async (form: CommentForm) => {
    if (!blogId) return;

    try {
      const commentsRef = collection(db, `blogs`, blogId, 'comments');

      const commentRef = await addDoc(commentsRef, {
        ...form,
      });
      setComments([...comments, { uid: commentRef.id,  ...form}]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (blogId) {
      querySingleBlog(blogId);
      getComments();
    }
  }, [blogId]);

  const getComments = async () => {
    if (!blogId) {
      return;
    }

    const blogRef = doc(db, 'blogs', blogId);
    const commentsRef = collection(db, `blogs`, blogId, 'comments');

    try {
      const commentsRaw = await getDocs(commentsRef);
      setComments(
        commentsRaw.docs.map((doc) => ({
          uid: doc.id,
          nickname: doc.data().nickname,
          comment: doc.data().comment,
          rating: doc.data().rating || 0,
        }))
      );
      console.log(
        'comments: ',
        commentsRaw.docs.map((doc) => ({
          uid: doc.id,
          nickname: doc.data().nickname,
          comment: doc.data().comment,
        }))
      );
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
    <MainContainer maxWidth="lg">
      <Grid container spacing={{ sm: 4, md: 8 }}>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h1">{blogs[0]?.title}</Typography>
          <Typography variant='subtitle1'>{blogs[0]?.timestamp.toDate().toDateString()}</Typography>
          <Typography variant="body1">{blogs[0]?.lead}</Typography>
          <CardMedia
            component="img"
            sx={{m: '30px 0px'}}
            image={blogs[0]?.imgUrl}
            title={blogs[0]?.title}
          />
          <Typography>{blogs[0]?.description}</Typography>
          <AddCommentForm submitForm={createComment} />
          {comments.map((comment) => (
            <Card key={comment.uid} elevation={0} sx={{ marginTop: '20px' }}>
              <CardContent>
                <Grid container justifyContent={'space-between'}>
                  <Grid item>
                  <Typography variant="h5">{comment.nickname}</Typography>
                  </Grid>
                  <Grid item>
                  <Rating size="small" name="simple-controlled" value={comment.rating} />
                  </Grid>
                </Grid>
                <Typography variant="subtitle1">
                  {blogs[0]?.timestamp
                    ? formatTimestamp(blogs[0]?.timestamp)
                    : ''}
                </Typography>
                <Typography>{comment.comment}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
          <Grid container spacing={1}>
            <Grid item>
              <Typography>Arbeitszeit:</Typography>
            </Grid>
            <Stack direction="row" alignItems="top" gap={1}>
              <AccessAlarmIcon color="primary" />
              <Typography>{blogs[0]?.duration} Min.</Typography>
            </Stack>
          </Grid>
          <ZutatenCard elevation={0}>
            <CardContent component="div">
              <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item>
                  <Typography variant="h3">Du brauchst</Typography>
                </Grid>
                <Grid item>
                  <ListAltIcon />
                </Grid>
              </Grid>
              {blogs[0]?.ingredients &&
                blogs[0].ingredients.map((ingredient, index) => (
                  <ListItem disablePadding divider key={index}>
                    {ingredient.trim()}
                  </ListItem>
                ))}
            </CardContent>
          </ZutatenCard>
          <Grid sx={{ m: '30px 0px 20px 0px' }}>
          {blogs[0]?.tags && blogs[0].tags.map((tags, index) => (
              <TagButton key={index}>{tags.trim()}</TagButton>
          ))}
          </Grid>
          <Typography variant="h4">Rezept von {blogs[0]?.author}</Typography>
          <Sharing blogId={blogId!} title={blogs[0]?.title}/>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Detail;
