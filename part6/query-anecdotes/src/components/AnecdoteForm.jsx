import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addAnecdote } from '../api/anecdotes';
import { useNotification } from '../context/NotificationContext';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const mutation = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Anecdote added successfully!' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: error.response.data.error });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.length >= 5) {
      mutation.mutate({ content });
      setContent('');
    } else {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Anecdote must be at least 5 characters long' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Anecdote</button>
    </form>
  );
};

export default AnecdoteForm;
