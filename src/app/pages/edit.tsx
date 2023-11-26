import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { useBlogs, BlogForm } from './useBlogs'; // Annahme: Du hast bereits eine useBlogs-Funktion erstellt, um Blog-Informationen zu verwalten.


const EditBlog = () => {
  // const { uid } = useParams();
  // const history = useHistory();
  // const { blogs, querySingleBlog, updateBlog } = useBlogs(); // Annahme: Du hast eine Funktion updateBlog zum Aktualisieren von Blog-Beiträgen.

  // const [blogForm, setBlogForm] = useState<BlogForm>({
  //   title: '',
  //   category: '',
  //   lead: '',
  //   description: '',
  //   tags: [],
  //   ingredients: [],
  //   duration: '',
  // });

  // useEffect(() => {
  //   querySingleBlog(uid);
  // }, [uid]);

  // useEffect(() => {
  //   if (blogs.length > 0) {
  //     setBlogForm(blogs[0]);
  //   }
  // }, [blogs]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setBlogForm({ ...blogForm, [name]: value });
  // };

  // const handleUpdateBlog = () => {
  //   updateBlog(uid, blogForm);
  //   history.push(`/detail/${uid}`);
  // };

  return (
    <Container maxWidth="lg">
      <Typography variant='h1'>Rezept bearbeiten</Typography>
      <Typography variant='body1'>Coming soon...</Typography>
    </Container>
  );
};

export default EditBlog;
