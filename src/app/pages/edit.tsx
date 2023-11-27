import { Container, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import BlogForm, { BlogFormState } from '../components/blog-form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';
import blogsService from '../service/blogs.service';
// import { useParams, useHistory } from 'react-router-dom';
// import { useBlogs, BlogForm } from './useBlogs'; // Annahme: Du hast bereits eine useBlogs-Funktion erstellt, um Blog-Informationen zu verwalten.


const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { blogs, querySingleBlog } = useBlogs();
  const blogForm = useMemo(() => (blogs[0] ? { ...blogs[0], isEditMode: true } as BlogFormState : undefined), [blogs]);

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [uploadProcess, setUploadProcess] = useState<number>(0);

  useEffect(() => {
    if (blogId) {
      querySingleBlog(blogId);
    }
  }, []);

  const submit = async (form: BlogFormState) => {
    try {
      const hasUpdated = await blogsService.updateBlog(blogId!, { ...form });
      console.log('Update success!');
      navigate(`/detail/${blogId}`);
    } catch (e) {
      // error
      console.error('Update failed!', e);
    }
  };

  return (<>{
      blogForm ?
        <BlogForm user={currentUser} uploadProcess={uploadProcess} setFile={(file: File) => {
        }} submitForm={submit} initialFormState={blogForm}></BlogForm> :
        <>'Loading</>
    }</>
  );

  //
  // const history = useHistory();
  // // Annahme: Du hast eine Funktion updateBlog zum Aktualisieren von Blog-Beiträgen.

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
    <Container maxWidth='lg'>
      <Typography variant='h1'>Rezept bearbeiten</Typography>
      <Typography variant='body1'>Coming soon...</Typography>
    </Container>
  );
};

export default EditBlog;
