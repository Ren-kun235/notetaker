const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/api/notes', (req, res) => {
  const notesId = req.params.notes_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.notes_id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json('No notes with that ID');
    });
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { notes } = req.body;

  if (req.body) {
    const newNotes = {
      notes,
      notes_id: uuidv4(),
    };

    readAndAppend(newNotes, './db/db.json');
    res.json(`notes added successfully!`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;
