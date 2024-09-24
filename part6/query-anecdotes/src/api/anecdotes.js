import axios from 'axios';

const getAnecdotes = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes');
  return response.data;
};

const addAnecdote = async (newAnecdote) => {
  const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote);
  return response.data;
};

const voteAnecdote = async (anecdote) => {
    const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    return response.data;
  };
  
  export { getAnecdotes, addAnecdote, voteAnecdote };