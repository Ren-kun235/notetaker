const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

const fs = require('fs');

const notesDb = require('../db/db.json');

notes.get('/api/notes', (req, res) => {

  readFromFile(notesDb).then((data) => res.json(JSON.parse(data)));

});

notes.get('/api/notes', (req, res) => {

  const notesId = req.params.notes_id;

  readFromFile(notesDb)

    .then((data) => JSON.parse(data))
    .then((json) => {

      const result = json.filter((notes) => notes.notes_id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json('No notes with that ID');

    });

});

// notes.post('/', (req, res) => {
//   console.log(req.body);

//   const { title, text } = req.body;

//   if (req.body) {

//     const newNotes = {
//       title,
//       text,
//       notes_id: uuidv4(),
//     };

//     readAndAppend(newNotes, './db/db.json');
//     res.json(`notes added successfully!`);

//   } else {

//     res.error('Error in adding notes');

//   }

// });

notes.post('/', (req, res) => {

  const { title, text, } = req.body

  if (title && text) {

    const newNotes = {
      title,
      text,
      notes_id: uuidv4(),
    };

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {

      if (err) {

        console.error(err)

      } else {

        const parsedNote = JSON.parse(data)
        parsedNote.push(newNotes)
        notesDb.push(newNotes)

        fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4), (err) => err ? console.error(err) : console.log("It works!",))

        res.json(notesDb)

      }

    })

  }

})

module.exports = notes;
