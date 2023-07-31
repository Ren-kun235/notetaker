const express = require('express');
const path = require('path');
const api = require('./routes/index');
const notesDb = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);

app.use(express.static('public'));

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, '/public/notes.html'))

});


app.get('/api/notes', (req, res) => {

    res.json(notesDb)

    app.get('*', (req, res) => {

        res.sendFile(path.join(__dirname, '/public/index.html'))
    
    });

});

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
