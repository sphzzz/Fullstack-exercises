// src/components/Blog.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
describe('<Blog />', () => {
  const blog = {
    id: '1',
    user: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
    },
    likes: 5,
    author: 'Jane Doe',
    title: 'React Testing',
    url: 'http://example.com',
  };

  const user = {
    username: 'johndoe',
  };
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });
  test('renders title and author, but does not render URL or number of likes by default', () => {
    render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />);

    // Check that title and author are rendered
    const titleAuthorDiv = screen.getByText('React Testing Jane Doe');
    expect(titleAuthorDiv).toBeInTheDocument();

    // Check that URL and likes are not rendered by default
    const detailsDiv = screen.queryByText('http://example.com');
    expect(detailsDiv).not.toBeInTheDocument();
    const likesDiv = screen.queryByText('5 likes');
    expect(likesDiv).not.toBeInTheDocument();
  });
  test('shows URL and number of likes when the button controlling the shown details has been clicked', () => {
    render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />);

    const button = screen.getByText('view');
    fireEvent.click(button);

    // Check that URL and likes are rendered after clicking the button
    expect(screen.getByText('http://example.com')).toBeInTheDocument();
    expect(screen.getByText('5 likes')).toBeInTheDocument();
  });
  test('calls event handler twice if the like button is clicked twice', async () => {
    const mockHandler = jest.fn();

    mock.onPut(`/api/blogs/${blog.id}`).reply(200, {
      ...blog,
      likes: blog.likes + 1,
    });

    render(<Blog blog={blog} user={user} updateBlog={mockHandler} removeBlog={() => {}} />);

    const button = screen.getByText('view');
    fireEvent.click(button);

    const likeButton = screen.getByText('like');
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
  })
;