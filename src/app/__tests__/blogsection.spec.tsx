import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BlogSection from '../components/blogsection';
import Blog from '../models/Blog';
import User from '../models/User';

describe('BlogSection', () => {
  const mockBlogs = [
    new Blog({ uid: '1', title: 'Blog 1', lead: 'Lead 1', imgUrl: 'image1.jpg', userId: 'user1', avgRating: 4 }),
    new Blog({ uid: '2', title: 'Blog 2', lead: 'Lead 2', imgUrl: 'image2.jpg', userId: 'user2', avgRating: 3 }),
  ];

  const mockUser = new User({ uid: 'user1' });

  const mockHandleDelete = jest.fn();

  it('should render blogs correctly', () => {
    render(
      <BrowserRouter>
        <BlogSection blogs={mockBlogs} />
      </BrowserRouter>
    );

    expect(screen.getByText('Blog 1')).toBeInTheDocument();
    expect(screen.getByText('Blog 2')).toBeInTheDocument();
  });

  it('should show edit and delete icons for authorized user', () => {
    render(
      <BrowserRouter>
        <BlogSection blogs={mockBlogs} user={mockUser} handleDelete={mockHandleDelete} />
      </BrowserRouter>
    );

    expect(screen.getAllByLabelText('Rezept bearbeiten')).toHaveLength(1);
    expect(screen.getAllByLabelText('Rezept löschen')).toHaveLength(1);
  });

  it('should not show edit and delete icons for unauthorized user', () => {
    render(
      <BrowserRouter>
        <BlogSection blogs={mockBlogs} user={new User({ uid: 'user2' })} handleDelete={mockHandleDelete} />
      </BrowserRouter>
    );

    expect(screen.queryByLabelText('Rezept bearbeiten')).toBeNull();
    expect(screen.queryByLabelText('Rezept löschen')).toBeNull();
  });

  it('should open delete dialog on delete icon click', () => {
    render(
      <BrowserRouter>
        <BlogSection blogs={mockBlogs} user={mockUser} handleDelete={mockHandleDelete} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByLabelText('Rezept löschen')[0]);
    expect(screen.getByText('Sind Sie sicher, dass Sie diesen Blog löschen möchten?')).toBeInTheDocument();
  });
});
