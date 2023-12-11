import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, ListItem, Rating, Typography } from '@mui/material';
import AddCommentForm from '../components/add-comment-form';
import useBlogs from '../hooks/useBlogs';
import { MainContainer, myTheme, StyledTagButton, ZutatenCard } from '../theme/my-theme';
import Sharing from '../components/sharing';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useComments from '../hooks/useComments';
import { FieldValue, Timestamp } from '@firebase/firestore';


const Detail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const { blogs, querySingleBlog, deleteBlog } = useBlogs();

  const { comments, queryComments, createComment, deleteComment } = useComments();


  useEffect(() => {
    if (blogId) {
      querySingleBlog(blogId);
      queryComments(blogId);
    }
  }, [blogId]);

  const handleDelete = async () => {
    await deleteBlog(blogId!);
    navigate('/');
  };

  const formatTimestamp = (timestamp: FieldValue | Timestamp) => {
    if (timestamp && timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString();
    }
    return '';
  };

  return (
    <MainContainer maxWidth='lg'>
      <Grid container sx={{ padding: '0 0 20px 0' }} spacing={{ sm: 4, md: 6 }}>
        <Grid item xs={12} sm={7} md={8}>
          <Typography variant='h1' sx={{ mb: '0px' }}>{blogs[0]?.title}</Typography>
          <Grid item sx={{ m: '0 0 10px 0' }}>
            {blogs[0]?.avgRating ? <Rating size='small' readOnly value={blogs[0]?.avgRating} /> : ''}
          </Grid>
          <Typography variant='body1'>{blogs[0]?.lead}</Typography>
        </Grid>
        {currentUser ? (
          <Grid item xs={12} sm={5} md={4}>
            <Grid container alignItems={'center'} justifyContent={'flex-end'} spacing={1}>
              <Grid item>
                <Link to={`/edit/${blogId}`}>
                  <EditIcon sx={{
                    color: myTheme.palette.secondary.main,
                    transition: '.3s ease-out',
                    '&:hover': {
                      color: myTheme.palette.primary.main
                    }
                  }} />
                </Link>
              </Grid>
              <Grid item>
                <DeleteOutlinedIcon
                  sx={{
                    color: myTheme.palette.secondary.main,
                    transition: '.3s ease-out',
                    '&:hover': {
                      color: myTheme.palette.primary.main
                    }
                  }}
                  onClick={handleDelete}
                ></DeleteOutlinedIcon>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      <Grid container spacing={{ sm: 4, md: 6 }}>
        <Grid item xs={12} sm={7} md={8}>
          <Card elevation={0}>
            <CardMedia component='img' image={blogs[0]?.imgUrl} title={blogs[0]?.title} />
            <CardContent>
              <Typography>{blogs[0]?.description}</Typography>
            </CardContent>
          </Card>
          <Typography variant='h3' sx={{ m: '50px 0px 0px 0px' }}>Kommentare</Typography>
          {currentUser ? (
            <AddCommentForm submitForm={(comment) => createComment(blogId!, {...comment, authorId: currentUser.uid})} />
          ) : ''}
          {comments.map((comment) => (
            <Card key={comment.uid} elevation={0} sx={{ marginTop: '30px' }}>
              <CardContent>
                <Grid container justifyContent={'space-between'}>
                  <Grid item>
                    <Typography variant='h4'>{comment.nickname}</Typography>
                  </Grid>
                  <Grid item>
                    <Rating size='small' readOnly value={comment.rating} />
                  </Grid>
                </Grid>
                <Typography variant='subtitle1'>
                  {blogs[0]?.timestamp
                    ? formatTimestamp(blogs[0]?.timestamp)
                    : ''}
                </Typography>
                <Typography>{comment.comment}</Typography>
                {currentUser?.uid === comment.authorId ? <DeleteOutlinedIcon onClick={() => deleteComment(blogId!, comment.uid!)} />: ''}
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <ZutatenCard elevation={0}>
            <CardContent component='div' sx={{ p: '20px' }}>
              <Grid
                container
                justifyContent={'space-between'}
              >
                <Grid item>
                  <Typography variant='h2'>Zutaten</Typography>
                </Grid>
              </Grid>
              {blogs[0]?.ingredients &&
                blogs[0].ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    {ingredient.trim()}
                  </ListItem>
                ))}
            </CardContent>
          </ZutatenCard>
          <Grid container>
            <Grid container alignItems={'center'} justifyContent={'space-between'}
                  sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Grid item>
                <Typography sx={{ fontWeight: '700' }}>Arbeitszeit:</Typography>
              </Grid>
              <Grid item>
                <Typography>{blogs[0]?.duration} Min.</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems={'center'} justifyContent={'space-between'}
                  sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', p: '10px 0px 0px 0px' }}>
              <Grid item>
                <Typography sx={{ fontWeight: '700' }}>Kategorie:</Typography>
              </Grid>
              <Grid item>
                <Typography>{blogs[0]?.category}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ p: '10px 0px 0px 0px' }}>
              <Grid item>
                <Typography sx={{ fontWeight: '700' }}>Niveau:</Typography>
              </Grid>
              <Grid item>
                <Typography>{blogs[0]?.niveau}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ m: '20px 0px 20px 0px' }}>
            {blogs[0]?.tags &&
              blogs[0].tags.map((tags, index) => (
                <StyledTagButton key={index}>{tags.trim()}</StyledTagButton>
              ))}
          </Grid>
          <Typography><Box fontWeight='700' display='inline'>Rezept von:</Box> {blogs[0]?.author}</Typography>
          {/* <Typography><Box fontWeight='700' display='inline'>Erfasst am:</Box> {blogs[0]?.timestamp.toDate().toDateString()}</Typography> */}
          <Sharing blogId={blogId!} title={blogs[0]?.title} />
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Detail;
