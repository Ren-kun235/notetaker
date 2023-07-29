const express = require('express')

const PORT = 3001;

const app = express();

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, '/public/index.html'))

    // console.info(`${req.method}`);

});

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, '/public/notes.html'))
  
    // console.info(`${req.method}`);

});

app.get('/api/notes', (req, res) => {

    // res.sendFile(path.join(__dirname, '/public/notes.html'))

    // console.info(`${req.method}`);

});

app.post('/api/notes', (req, res) => {

    // res.sendFile(path.join(__dirname, '/public/notes.html'))
  
    // console.info(`${req.method}`);

});

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
