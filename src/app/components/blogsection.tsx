import { Button, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import User from '../models/User';
import DialogDelete from './dialog-delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


interface BlogSectionProps {
  blogs: any[];
  user?: User;
  handleDelete: (id: any) => void;
}


const BlogSection: React.FC<BlogSectionProps> = ({ blogs, user, handleDelete }) => {

  const userId = user?.uid;
  const [value, setValue] = React.useState<number | null>(null);
  console.log({ value });
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: number | null) => {
    setValue(newValue);
  };

  const handleDeleteBlog = (id: number) => {
    // TODO: delete logic
    console.log('Delete blog: ', id);
    setDeleteDialogOpen(false);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Grid container spacing={4}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={12} md={6} key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <CardMedia component='img' image={item.imgUrl} title={item.title} />
            </Link>
            <Stack></Stack>
            <Rating
              size='small'
              name='simple-controlled'
              value={value}
              // onChange={handleChange}
            />
            <Typography variant='h3'>{item.title}</Typography>
            <Typography>{item.lead}</Typography>
            <Typography><strong>{item.category}</strong></Typography>
            <Grid container>
              <Grid item xs={6}>
                <Link to={`/detail/${item.id}`}>
                  <Button color='secondary' variant='outlined' disableElevation>Read more</Button>
                </Link>
              </Grid>
              <Grid item xs={6} textAlign={'right'}>
                <DeleteOutlinedIcon onClick={handleClickOpen}></DeleteOutlinedIcon>
                {/* <DeleteOutlinedIcon onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }}></DeleteOutlinedIcon> */}
              </Grid>
            </Grid>
            {/* { !!userId ? <DeleteOutlinedIcon onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }}></DeleteOutlinedIcon> : '' } */}

            <DialogDelete isOpen={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)}
                          handleDelete={() => handleDeleteBlog(item.id)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogSection;
