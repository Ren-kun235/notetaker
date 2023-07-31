const fs = require('fs');
const util = require('util');
const notesDb = require('../db/db.json')

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, parsedNotes) =>

  fs.writeFile(destination, JSON.stringify(parsedNotes, null, 4), (err) =>

    err ? console.error(err) : console.info(`\nData written to ${destination}`)

  );

const readAndAppend = (newNotes, file) => {

  fs.readFile(file, 'utf8', (err, data) => {

    if (err) {

      console.error(err);

    } else {

      const parsedData = JSON.parse(data);
      notesDb.push(newNotes);
      writeToFile(file, parsedData);
      
    }

  });

};

module.exports = { readFromFile, writeToFile, readAndAppend };
