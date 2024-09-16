// src/components/BlogForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';

test('calls the event handler it received as props with the right details when a new blog is created', () => {
  const handleAddBlog = jest.fn();

  render(<BlogForm handleAddBlog={handleAddBlog} />);

  const titleInput = screen.getByPlaceholderText('Title');
  const authorInput = screen.getByPlaceholderText('Author');
  const urlInput = screen.getByPlaceholderText('Url');
  const createButton = screen.getByText('create');

  fireEvent.change(titleInput, { target: { value: 'Testing React forms' } });
  fireEvent.change(authorInput, { target: { value: 'John Doe' } });
  fireEvent.change(urlInput, { target: { value: 'http://example.com' } });
  fireEvent.click(createButton);

  expect(handleAddBlog).toHaveBeenCalledTimes(1);
  expect(handleAddBlog).toHaveBeenCalledWith({
    title: 'Testing React forms',
    author: 'John Doe',
    url: 'http://example.com',
  });
});