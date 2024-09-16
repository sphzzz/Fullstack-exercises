// src/components/BlogForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleAddBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          value={newBlog.title}
          name="Title"
          placeholder="Title"
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="Author"
          placeholder="Author"
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="Url"
          placeholder="Url"
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
};
export default BlogForm;