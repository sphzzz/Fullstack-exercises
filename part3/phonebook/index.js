const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');  // Import the Person model

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Fetch all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

// Fetch a person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// Add a new person
app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));
});
// PUT (update) a person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' });
  }

  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).json({ error: 'person not found' });
      }
    })
    .catch(error => next(error));
});
// Delete a person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

// Middleware for handling unknown routes
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
});

// Middleware for error handling
app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

