const express = require('express')
const app = express()
const currentDate = new Date();
app.use(express.json())
const morgan = require('morgan');
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = Math.floor(Math.random()*9999999999)
  return String(maxId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

    if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }  

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})