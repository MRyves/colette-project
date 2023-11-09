import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../models/User';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CookieIcon from '@mui/icons-material/Cookie';
import BlogSection from '../components/blogsection';

interface BakingProps {
  blogs: any[];
  user?: User;
  handleDelete: (id: any) => void;
}

const Baking: React.FC<BakingProps> = ({ blogs, user, handleDelete }) => {

  const filteredBlogs = blogs.filter((blog) => blog.category === 'Backen');

  return (
    <div>
      <Grid container spacing={5}>
        {/* Hier wird die BlogSection-Komponente einmal aufgerufen und die gefilterten Blogs als Prop übergeben */}
        <BlogSection blogs={filteredBlogs} user={user} handleDelete={handleDelete} />
      </Grid>
    </div>
  );
};

export default Baking;
