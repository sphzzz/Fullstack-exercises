const mongoose = require('mongoose');

// Get command-line arguments
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

// Replace <password> with the actual password and connect to the phonebook database
const url = `mongodb+srv://shanpeihao:${password}@cluster0.xcedl.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema and model for a Person entry
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// If no name and number are provided, list all entries
if (!name && !number) {
  Person.find({})
    .then(persons => {
      console.log('phonebook:');
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch(error => {
      console.error(error);
    });
} else {
  // If name and number are provided, add a new entry to the phonebook
  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then(result => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch(error => {
      console.error(error);
    });
}
