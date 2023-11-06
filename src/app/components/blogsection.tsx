import { Button, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
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
  const [value, setValue] = React.useState<number | null>(2);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteBlog = (id: number) => {
    // TODO: delete logic
    console.log('Delete blog: ', id);
    setDeleteDialogOpen(false);
  };

  return (
    <div>
      <Grid container spacing={5}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={12} md={6} key={item.id}>
            <Card sx={{ borderRadius: 0, boxShadow: 2 }}>
              <Link to={`/detail/${item.id}`}>
                <CardMedia component='img' image={item.imgUrl} title={item.title} />
              </Link>
              <CardContent>
                <Rating
                  size='small'
                  name='simple-controlled'
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <Typography variant='h3'>{item.title}</Typography>
                <Typography>{item.lead}</Typography>
                <p><strong>{item.category}</strong></p>
                <div>
                  <p>{item.author}</p>
                </div>
                <Link to={`/detail/${item.id}`}>
                  <Button color='secondary' variant='outlined' disableElevation>Read more</Button>
                </Link>
                <Button variant='outlined' onClick={() => setDeleteDialogOpen(true)}>
                  <DeleteOutlinedIcon />
                </Button>
                <DialogDelete isOpen={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)}
                              handleDelete={() => handleDeleteBlog(item.id)} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogSection;
