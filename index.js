const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var morgan = require("morgan");
const cors = require('cors')

app.use(cors())
app.use(morgan('tiny'));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "045-1236543",
    date: "2017-12-10T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    name: "Arto Järvinen",
    number: "045-2134567",
    date: "2017-12-10T17:30:31.098Z",
    important: true
  },
  {
    id: 3,
    name: "Lea Kutvonen",
    number: "045-2323233",
    date: "2017-12-10T17:30:31.098Z",
    important: true
  },
  {
    id: 4,
    name: "Arto Pekkarinen",
    number: "045-1234567",
    date: "2017-12-10T17:30:31.098Z",
    important: true
  }
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
              <p>${new Date()}</p>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find(note => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
  return maxId + 1;
};

const contains = name => {
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name === name) {
      return true;
    }
  }
  return false;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.number === undefined) {
    return response.status(400).json({
      error: "number missing"
    });
  } else if (body.name === undefined) {
    return response.status(400).json({
      error: "name missing"
    });
  } else if (contains(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const note = {
    name: body.name,
    number: body.number,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  };

  persons = persons.concat(note);

  response.json(note);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(note => note.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
