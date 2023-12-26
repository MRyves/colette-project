import { useNavigate, useParams } from 'react-router-dom';
import BlogSection from '../components/blogsection';
import useBlogs from '../hooks/useBlogs';
import React, { useEffect, useMemo } from 'react';
import { MainContainer } from '../theme/my-theme';

const TagsPage: React.FC = () => {
  const { tag } = useParams();
  const navigate = useNavigate();
  const { blogs, queryBlogs } = useBlogs();

  const filteredBlogs = useMemo(() => {
    console.log({ blogs, tag });
    return tag ? blogs.filter((blog) => blog.tags.includes(tag)) : [];
  }, [blogs]);

  useEffect(() => {
    if (!tag) {
      navigate('/');
    }
    queryBlogs();
  }, []);

  return (
    <MainContainer maxWidth="lg">
        {/* <Typography variant="h1">Tags</Typography> */}
        {filteredBlogs.length > 0 ? (
          <BlogSection blogs={filteredBlogs}></BlogSection>
        ) : (
          <span>Es wurden keine Blogs mit diesem Tag gefunden</span>
        )}{' '}
    </MainContainer>
  );
};

export default TagsPage;
