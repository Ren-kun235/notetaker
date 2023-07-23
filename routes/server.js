const express = require('express')

const PORT = 3001;

const app = express();

app.get('/api/something', (req, res) => {

    res.json(`${req.method}`);

    console.info(`${req.method}`);

});

app.post('/api/reviews', (req, res) => {

    res.json(`${req.method}`);
  
    console.info(`${req.method}`);

});

app.get('/api/upvotes', (req, res) => {

    res.json(`${req.method}`);

    console.info(`${req.method}`);

});

app.post('/api/upvotes', (req, res) => {

    res.json(`${req.method}`);
  
    console.info(`${req.method}`);

});

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
