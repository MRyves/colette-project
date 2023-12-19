import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, ListItem, Rating, Typography } from '@mui/material';
import useBlogs from '../hooks/useBlogs';
import { Colors, MainContainer, StyledTagButton, ZutatenCard } from '../theme/my-theme';
import Sharing from '../components/sharing';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CommentSection from '../components/commentsection';


const Detail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const { blogs, querySingleBlog, deleteBlog } = useBlogs();



  useEffect(() => {
    if (blogId) {
      querySingleBlog(blogId);
    }
  }, [blogId]);

  const handleDelete = async () => {
    await deleteBlog(blogId!);
    navigate('/');
  };


  return (
    <MainContainer maxWidth='lg'>
      <Grid container spacing={{ md: 4, lg: 6 }}>
        <Grid item xs={12} md={7} lg={8}>
          <Typography variant='h1' sx={{ mb: '10px' }}>{blogs[0]?.title}</Typography>
          <Grid item sx={{ m: '0 0 10px 0' }}>
            {blogs[0]?.avgRating ? <Rating size='small' readOnly value={blogs[0]?.avgRating} /> : ''}
          </Grid>
        </Grid>
        {currentUser ? (
          <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems={'center'} justifyContent={'flex-end'} spacing={1}>
              <Grid item>
                <Link to={`/edit/${blogId}`}>
                  <EditIcon sx={{
                    color: Colors.secondary.main,
                    transition: '.3s ease-out',
                    '&:hover': {
                      color: Colors.primary.main
                    }
                  }} />
                </Link>
              </Grid>
              <Grid item>
                <DeleteOutlinedIcon
                  sx={{
                    color: Colors.secondary.main,
                    transition: '.3s ease-out',
                    '&:hover': {
                      color: Colors.primary.main
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
      <Grid container spacing={{ md: 4, lg: 6 }}>
        <Grid item xs={12} md={7} lg={8}>
          <Card elevation={0} sx={{mb: '30px'}}>
            <CardMedia component='img' image={blogs[0]?.imgUrl} title={blogs[0]?.title} />
          </Card>
        </Grid>
        <Grid item xs={12} md={5} lg={4} sx={{mb: '20px'}}>
          <Typography variant='body1' sx={{ mb: '30px' }}>{blogs[0]?.lead}</Typography>
            <Grid container>
              <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ borderWidth: 0, borderBottomWidth: '1px', borderStyle: 'solid', borderColor: Colors.borderColors }}>
                <Grid item>
                  <Typography sx={{ fontWeight: '700' }}>Arbeitszeit:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{blogs[0]?.duration} Min.</Typography>
                </Grid>
              </Grid>
              <Grid container alignItems={'center'} justifyContent={'space-between'}
                    sx={{ borderWidth: 0, borderBottomWidth: '1px', borderStyle: 'solid', borderColor: Colors.borderColors, p: '10px 0px 0px 0px' }}>
                <Grid item>
                  <Typography sx={{ fontWeight: '700' }}>Kategorie:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{blogs[0]?.category}</Typography>
                </Grid>
              </Grid>
              <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ p: '10px 0px 0px 0px' }}>
                <Grid item>
                  <Typography sx={{ fontWeight: '700' }}>Level:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{blogs[0]?.level}</Typography>
                </Grid>
              </Grid>
            </Grid>
          <Grid sx={{ m: '20px 0px 20px 0px' }}>
            {blogs[0]?.tags &&
              blogs[0].tags.map((tags, index) => (
                <StyledTagButton disabled key={index}>{tags.trim()}</StyledTagButton>
              ))}
          </Grid>
          <Typography><Box fontWeight='700' display='inline'>Rezept von:</Box> {blogs[0]?.author}</Typography>
          <Sharing blogId={blogId!} title={blogs[0]?.title} />
        </Grid>
      </Grid>
      <Grid container flexDirection={'row-reverse'} spacing={{ md: 4, lg: 6 }}>
        <Grid item xs={12} md={5} lg={4}>
          <ZutatenCard elevation={0}>
            <CardContent component='div' sx={{ p: '20px' }}>
              <Grid container justifyContent={'space-between'}>
                <Grid item>
                  <Typography variant='h2'>Zutaten</Typography>
                  <Typography variant='subtitle1'>{blogs[0]?.quantity}</Typography>
                </Grid>
              </Grid>
              {blogs[0]?.ingredients &&
                blogs[0].ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <Grid container>
                      <Grid item xs={3} sx={{ fontWeight: 700 }}>
                        {ingredient.amount}
                      </Grid>
                      <Grid item xs={9}>
                        {ingredient.name.trim()}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
            </CardContent>
          </ZutatenCard>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant='h2'>Zubereitung</Typography>
              <Typography>{blogs[0]?.description}</Typography>
              {blogs[0]?.additional && (
                <>
                  <Typography sx={{mt: '50px'}} variant='h3'>Tipps & Tricks</Typography>
                  <Typography>{blogs[0]?.additional}</Typography>
                </>
              )}
            </CardContent>
          </Card>

          <CommentSection />
          {/* <Typography variant='h3' sx={{ m: '50px 0px 0px 0px' }}>Kommentare</Typography>
          {currentUser ? (
            <AddCommentForm submitForm={(comment) => createComment(blogId!, {...comment, authorId: currentUser.uid})} />
          ) : ''}
          {comments.length === 0 ? (
            <BlankSlateComment />
          ) : (
            comments.map((comment) => (
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
                <Grid container spacing={2} alignItems={'center'} sx={{mb: '8px'}}>
                  <Grid item>
                  <Typography variant='subtitle1'>
                      {blogs[0]?.timestamp
                        ? formatTimestamp(blogs[0]?.timestamp)
                        : ''}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {currentUser?.uid === comment.authorId ? <DeleteOutlinedIcon color="disabled" fontSize='small' onClick={() => deleteComment(blogId!, comment.uid!)} />: ''}
                  </Grid>
                </Grid>
                <Typography>{comment.comment}</Typography>
              </CardContent>
            </Card> 
          ))
          )} */}
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Detail;