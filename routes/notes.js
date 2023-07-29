const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:notes_id', (req, res) => {
  const notesId = req.params.notes_id;
  readFromFile('./db/notes.json')
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

  const { username, topicNotes } = req.body;

  if (req.body) {
    const newNotes = {
      username,
      notes,
      topic,
      notes_id: uuidv4(),
    };

    readAndAppend(newNotes, './db/notes.json');
    res.json(`notes added successfully!`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;
