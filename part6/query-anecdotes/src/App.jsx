import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, voteAnecdote } from './api/anecdotes';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { NotificationProvider, useNotification } from './context/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery('anecdotes', getAnecdotes);
  const { dispatch } = useNotification();

  const voteMutation = useMutation(voteAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes');
      dispatch({ type: 'SET_NOTIFICATION', payload: `You voted for '${anecdote.content}'` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>anecdote service not available due to problems in server on localhost</div>;
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <ul>
        {data.map(anecdote => (
          <li key={anecdote.id}>
            {anecdote.content} <strong>has {anecdote.votes} votes</strong>
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;