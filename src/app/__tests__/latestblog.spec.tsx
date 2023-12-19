import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LatestBlog from '../components/latestblog';
import Blog from '../models/Blog';

// Mocks for Material UI components and icons
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  // Mock specific MUI components here
}));
jest.mock('@mui/icons-material/DeleteOutlined', () => () => <button>DeleteIcon</button>);
jest.mock('@mui/icons-material/Edit', () => () => <span>EditIcon</span>);

// Mock for React Router's Link
jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>
}));

// Mock for the custom ReadmoreButton
jest.mock('../theme/my-theme', () => ({
  ReadmoreButton: ({ children }) => <button>{children}</button>,
  Colors: {
    black: '#000000',
    white: '#ffffff',
    borderColors: '#e0e0e0',
    lightgrey: '#dddddd',
    grey: '#a4a2a1',
    primary: {
      light: '#e0d0bb',
      main: '#4e5277',
      dark: '#393d68',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e0d0bb',
      main: '#c1a178',
      dark: '#835635',
      contrastText: '#ffffff',
    }
  }
}));

describe('LatestBlog', () => {
  const sampleBlogs : Blog[] = [
    {
      uid: 'blog1',
      title: 'Sample Blog',
      imgUrl: 'sample.jpg',
      avgRating: 4,
      lead: 'This is a sample blog lead.',
      userId: 'user123'
    } as Blog,
    {
      uid: 'blog2',
      title: 'Sample Blog 1',
      imgUrl: 'sample 1.jpg',
      avgRating: 4,
      lead: 'This is a sample blog lead 1.',
      userId: 'user123'
    } as Blog,
  ];

  const sampleUser = { uid: 'user123', displayName: 'jest-unit-test', email: 'jest-unit-test' };

  test('renders the latest blog', () => {
    const handleDelete = jest.fn();
    render(<LatestBlog blogs={sampleBlogs} user={sampleUser} handleDelete={handleDelete} />);
    expect(screen.getByText('Sample Blog')).toBeInTheDocument();
    expect(screen.getByText('This is a sample blog lead.')).toBeInTheDocument();
    expect(screen.getByTitle(sampleBlogs[0].title)).toHaveAttribute('src', 'sample.jpg');
  });

  test('renders BlankSlate when no blogs are provided', () => {
    const handleDelete = jest.fn();
    render(<LatestBlog blogs={[]} user={sampleUser} handleDelete={handleDelete} />);
    expect(screen.getByText('Es wurden noch keine Rezepte erfasst')).toBeInTheDocument(); // Adjust the text based on your BlankSlate implementation
  });

  test('displays edit and delete icons when the blog is created by the logged-in user', () => {
    const handleDelete = jest.fn();
    render(<LatestBlog blogs={sampleBlogs} user={sampleUser} handleDelete={handleDelete} />);
    expect(screen.getByText('EditIcon')).toBeInTheDocument();
    expect(screen.getByText('DeleteIcon')).toBeInTheDocument();
  });

});
