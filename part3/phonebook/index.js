const express = require('express')
const app = express()
const currentDate = new Date();

const options = {
    timeZoneName: 'short'
};

const formatter = new Intl.DateTimeFormat('en-US', options);
let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    }

]

app.get('/info', (request, response) => {
  response.send(
    'Phonebook has info for ' + persons.length + ` people<br>` + 
    `${currentDate.toString()}`
  )})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})