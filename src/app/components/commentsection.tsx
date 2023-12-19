import React, { useEffect } from 'react';
import { Typography, Card, CardContent, Grid, Rating } from '@mui/material';
import AddCommentForm from './add-comment-form';
import BlankSlateComment from './blankslate/blankslate-comment';
import useComments from '../hooks/useComments';
import { FieldValue, Timestamp } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import useBlogs from '../hooks/useBlogs';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';




const CommentSection = () => {

    const { blogId } = useParams();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const { comments, queryComments, createComment, deleteComment } = useComments();
    const { blogs } = useBlogs();

    
    const formatTimestamp = (timestamp: FieldValue | Timestamp) => {
        if (timestamp && timestamp instanceof Timestamp) {
          return timestamp.toDate().toLocaleString();
        }
        return '';
      };

      
      useEffect(() => {
        if (blogId) {
          queryComments(blogId);
        }
      }, [blogId]);
    


      
    return (
    <>
      <Typography variant="h2" sx={{ m: '50px 0px 0px 0px' }}>Kommentare</Typography>
      {currentUser ? (
        <AddCommentForm
          submitForm={(comment) =>
            createComment(blogId!, { ...comment, authorId: currentUser.uid })
          }
        />
      ) : (
        ''
      )}
      {comments.length === 0 ? (
        <BlankSlateComment />
      ) : (
        comments.map((comment) => (
          <Card key={comment.uid} elevation={0} sx={{ marginTop: '30px' }}>
            <CardContent>
              <Grid container justifyContent={'space-between'}>
                <Grid item>
                  <Typography variant="h4">{comment.nickname}</Typography>
                </Grid>
                <Grid item>
                  <Rating size="small" readOnly value={comment.rating} />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems={'center'}
                sx={{ mb: '8px' }}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    {blogs[0]?.timestamp
                      ? formatTimestamp(blogs[0]?.timestamp)
                      : ''}
                  </Typography>
                </Grid>
                <Grid item>
                  {currentUser?.uid === comment.authorId ? (
                    <DeleteOutlinedIcon
                      color="disabled"
                      fontSize="small"
                      onClick={() => deleteComment(blogId!, comment.uid!)}
                    />
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
              <Typography>{comment.comment}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default CommentSection;
