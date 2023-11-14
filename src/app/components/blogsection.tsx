import { Button, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import User from '../models/User';
import DialogDelete from './dialog-delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


interface BlogSectionProps {
  blogs: any[];
  user?: User;
  handleDelete: (uid: string) => void;
}


const BlogSection: React.FC<BlogSectionProps> = ({ blogs, user, handleDelete }) => {

  const userId = user?.uid;
  const [value, setValue] = React.useState<number | null>(null);
  console.log({ value });
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number | null) => {
    setValue(newValue);
  };

  const handleDeleteBlog = (uid: string) => {
    setDeleteDialogOpen(false);
    handleDelete(uid);
  };


  const handleClickOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };


  return (
    <div>
      <Grid container spacing={4}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={12} md={6} key={item.uid}>
            <Link to={`/detail/${item.uid}`}>
              <CardMedia component='img' image={item.imgUrl} title={item.title} />
            </Link>
            <Stack></Stack>
            <Rating
              size='small'
              name='simple-controlled'
              value={value}
              // onChange={handleChange}
            />
            <Link to={`/detail/${item.uid}`}>
              <Typography variant='h3'>{item.title}</Typography>
            </Link>
            <Typography>{item.lead}</Typography>
            <Typography><strong>{item.category}</strong></Typography>
            <Grid container>
              <Grid item xs={6}>
                <Link to={`/detail/${item.uid}`}>
                  <Button color='secondary' variant='outlined' disableElevation>Zum Rezept</Button>
                </Link>
              </Grid>
              {userId ? (
                <Grid item xs={6} textAlign={'right'}>
                  <DeleteOutlinedIcon onClick={handleClickOpen}></DeleteOutlinedIcon>
                </Grid>
              ) : ""}
            </Grid>
            <DialogDelete isOpen={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} handleDelete={() => handleDeleteBlog(item.uid)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogSection;
