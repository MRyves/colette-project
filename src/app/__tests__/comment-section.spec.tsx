import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentSection from '../components/commentsection';
import { renderWithProviders } from './utils';

// Mocks for Material UI components and icons
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material')
  // Add specific mocks for MUI components used
}));
jest.mock('@mui/icons-material/DeleteOutlined', () => () => <span>DeleteIcon</span>);

// Mock custom hooks
jest.mock('../hooks/useComments', () => () => ({
  comments: [],
  queryComments: jest.fn(),
  createComment: jest.fn(),
  deleteComment: jest.fn()
}));
jest.mock('../hooks/useBlogs', () => () => ({
  blogs: []
}));

describe('CommentSection', () => {

  test('renders without crashing', async () => {
    renderWithProviders(<CommentSection blogId="jest-unit-test" />);
    expect(await screen.findByText(/Kommentare/i)).toBeInTheDocument();
  });

  test('displays AddCommentForm if user is logged in', async () => {
    // Mock Redux state to simulate logged-in user
    const mockLoggedInState = {
      auth: {
        currentUser: { uid: '123', email: 'test-email@jest.com', displayName: 'Jest unit-test' },
        loading: false
      },
    };
    renderWithProviders(<CommentSection blogId="jest-unit-test" />, { preloadedState: mockLoggedInState });
    expect(await screen.findByText('Kommentieren')).toBeInTheDocument();
  });

  test('renders BlankSlateComment when there are no comments', async () => {
    renderWithProviders(<CommentSection blogId="jest-unit-test"/>);
    // Expect BlankSlateComment to be in the document
    expect(await screen.findByText('nicht bewertet', { exact: false })).toBeInTheDocument();
  });

});
