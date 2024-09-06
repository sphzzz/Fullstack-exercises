// models/person.js
const mongoose = require('mongoose');

// MongoDB connection
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// Define the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        // Regular expression to validate the phone number format
        return /^(\d{2,3})-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Phone number must be in the format XX-XXXXXXX or XXX-XXXXXXXX.`
    }
  }
});

// Customize JSON output
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
