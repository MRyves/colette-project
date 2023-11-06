import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    Rating,
    Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import User from '../models/User';


interface BlogSectionProps {
  blogs: any[];
  user?: User;
  handleDelete: (id: any) => void;
}


const BlogSection: React.FC<BlogSectionProps> = ({ blogs, user, handleDelete }) => {

  const userId = user?.uid;
  const [value, setValue] = React.useState<number | null>(2);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                {/* <DialogDelete handleDelete={handleDelete} /> */}
                <Button variant='outlined' onClick={handleClickOpen}>
                  <DeleteOutlinedIcon />
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Are you sure you want to delete this recipe?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button size='small'>{userId ?
                      <DeleteOutlinedIcon onClick={() => handleDelete(item.id)}
                                          style={{ cursor: 'pointer' }}></DeleteOutlinedIcon> : ''}</Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogSection;
