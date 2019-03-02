const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);


if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-n21xs.mongodb.net/phonebook-app?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
  date: Date,
});

const Person = mongoose.model('Person', personSchema);

console.log(process.argv.length);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const person = {
    id: process.argv[3],
    name: process.argv[4],
    number: process.argv[5],
    important: false,
    date: new Date(),
  };

  Person.findByIdAndUpdate(person.id, person, { new: true })
    .then((updatedNote) => {
      console.log(updatedNote.toJSON());
    });
}
