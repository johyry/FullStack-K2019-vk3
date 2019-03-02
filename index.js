if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

morgan.token('body', req => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
              <p>${new Date()}</p>`);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map(person => person.toJSON()));
  });
  // res.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: 'malformatted id' });
    });


  /* const note = persons.find(note => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  } */
});


app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  console.log('whats goin on?? app.post is here');

  const person = new Person({
    name: body.name,
    number: body.number,
    // important: body.important || false,
    date: new Date(),
  });

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson);
    })

    .catch(error => next(error));
  /* persons = persons.concat(person);

  response.json(person); */
});

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body;
  console.log('do we ever get to put????');

  const person = {
    name: body.name,
    number: body.number,
  };
  console.log(`person : ${person}`);

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch(error => next(error));

  /* persons = persons.filter(note => note.id !== id);

  response.status(204).end(); */
});


// virheidenkäsittelijät
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);


/* const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
  return maxId + 1;
}; */

/* const contains = name => {
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name === name) {
      return true;
    }
  }
  return false;
}; */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
