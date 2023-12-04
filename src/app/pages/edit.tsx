import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import BlogForm, { BlogFormState } from '../components/blog-form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';
// import blogsService from '../services/blogs.service';
import blogsService from '../services/blogs.service';

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { blogs, querySingleBlog } = useBlogs();
  const blogForm = useMemo(
    () =>
      blogs[0]
        ? ({ ...blogs[0], isEditMode: true } as BlogFormState)
        : undefined,
    [blogs]
  );

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

  return (
    <Container maxWidth="lg">
      {blogForm ? (
        <BlogForm
          user={currentUser}
          uploadProcess={uploadProcess}
          setFile={(file: File) => {
            //
          }}
          submitForm={submit}
          initialFormState={blogForm}
        ></BlogForm>
      ) : (
        <>'Loading</>
      )}
    </Container>
  );
};

export default EditBlog;
