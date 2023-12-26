import { Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import User from '../models/User';
import DialogDelete from './dialog-delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Colors, ReadmoreButton } from '../theme/my-theme';
import Blog from '../models/Blog';
import { Link } from 'react-router-dom';


interface BlogSectionProps {
  blogs: Blog[];
  user?: User;
  handleDelete?: (uid: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({
                                                   blogs,
                                                   user,
                                                   handleDelete
                                                 }) => {
  const userId = user?.uid;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingUid, setDeletingUid] = useState<string>('');

  const handleDeleteBlog = () => {
    handleDelete!(deletingUid);
    setDeleteDialogOpen(false);
    setDeletingUid('');
  };

  const handleClickOpen = (uid: string) => {
    setDeletingUid(uid);
    setDeleteDialogOpen(true);
  };


  return (
    <Grid container spacing={4} sx={{ mb: '30px' }}>
      {blogs?.map((blog) => (
        <Grid item xs={12} sm={12} lg={6} key={blog.uid}>
          <Card elevation={0}>
            <Link to={`/detail/${blog.uid}`}>
              <CardMedia
                component='img'
                image={blog.imgUrl}
                title={blog.title}
                alt={"Bild von " + blog.title}
              />
            </Link>
            <CardContent>
              <Typography variant='h2'>
                <Link to={`/detail/${blog.uid}`}>{blog.title}</Link>
              </Typography>
              {blog.avgRating ? <Rating readOnly size='small' name='simple-controlled' value={blog.avgRating} /> : ''}
              <Grid sx={{ mb: '25px' }} item>
                <Typography>{blog.lead}</Typography>
              </Grid>
              <Grid container alignItems={'center'}>
                <Grid item xs={10}>
                  <Link to={`/detail/${blog.uid}`}>
                    <ReadmoreButton variant='outlined' disableElevation>
                      Zum Rezept
                    </ReadmoreButton>
                  </Link>
                </Grid>
                {userId === blog.userId ? (
                  <Grid item xs={2}>
                    <Grid container alignItems={'center'} justifyContent={'flex-end'} spacing={1}>
                      <Grid item xs={6}>
                        <Link aria-label="Rezept bearbeiten" to={`/edit/${blog.uid}`}>
                          <EditIcon
                            role="button"
                            sx={{
                              color: Colors.secondary.main,
                              transition: '.3s ease-out',
                              '&:hover': {
                                color: Colors.primary.main
                              }
                            }} />
                        </Link>
                      </Grid>
                      {!!handleDelete ?
                        <Grid item xs={6}>
                          <DeleteOutlinedIcon
                            aria-label="Rezept löschen"
                            sx={{
                              color: Colors.secondary.main,
                              transition: '.3s ease-out',
                              '&:hover': {
                                color: Colors.primary.main
                              }
                            }}
                            onClick={() => handleClickOpen(blog.uid)}
                          ></DeleteOutlinedIcon>
                        </Grid>
                        : ''}
                    </Grid>
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <DialogDelete
        isOpen={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleDelete={handleDeleteBlog}
      />
    </Grid>
  );
};

export default BlogSection;
