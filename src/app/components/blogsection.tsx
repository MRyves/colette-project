import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../models/User';
import DialogDelete from './dialog-delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { ReadmoreButton, myTheme } from '../theme/my-theme';



interface BlogSectionProps {
  blogs: any[];
  user?: User;
  handleDelete: (uid: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  blogs,
  user,
  handleDelete,
}) => {
  const userId = user?.uid;
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingUid, setDeletingUid] = useState<string>('');

  const handleDeleteBlog = () => {
    handleDelete(deletingUid);
    setDeleteDialogOpen(false);
    setDeletingUid('');
  };

  const handleClickOpen = (uid: string) => {
    setDeletingUid(uid);
    setDeleteDialogOpen(true);
  };



  return (
      <Grid container spacing={4}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={12} md={6} key={item.uid}>
                <Card elevation={0}>
            <Link to={`/detail/${item.uid}`}>
              <CardMedia
                component="img"
                image={item.imgUrl}
                title={item.title}
              />
            </Link>
              <CardContent>
                <Typography variant="h3">
                  <Link to={`/detail/${item.uid}`}>{item.title}</Link>
                </Typography>
                <Rating size="small" name="simple-controlled" value={ratingValue} />
                <Grid sx={{mb: '25px'}} item>
                  <Typography>{item.lead}</Typography>
                </Grid>
                <Grid container alignItems={'center'}>
                  <Grid item xs={10}>
                    <Link to={`/detail/${item.uid}`}>
                      <ReadmoreButton variant="outlined" disableElevation>
                        Zum Rezept
                      </ReadmoreButton>
                    </Link>
                  </Grid>
                  {userId ? (
                  <Grid item xs={2}>
                    <Grid container alignItems={'center'} justifyContent={'flex-end'} spacing={1}>
                        <Grid item>
                            <Link to={`/edit/${item.uid}`}>
                              <EditIcon sx={{color: myTheme.palette.secondary.main}} />
                            </Link>
                          </Grid>
                          <Grid item>
                            <DeleteOutlinedIcon
                              sx={{color: myTheme.palette.secondary.main}}
                              onClick={() => handleClickOpen(item.uid)}
                            ></DeleteOutlinedIcon>
                          </Grid>
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
