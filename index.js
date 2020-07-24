const express = require('express');
const app = express();
var cors = require('cors')
const port = 7000;

const connection = require('./config');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

app.get('/circus', (req, res) => {
  connection.query('SELECT * from circus_act', (err, results) => {

    if (err) {
      res.status(500).json({
        message: "Affichage Impossible",
        error: err,
  });
    } else {
      res.json(results);
    }
  });
});

app.get('/shows', (req, res) => {
  connection.query('SELECT * from circus_performance', (err, results) => {

    if (err) {
      res.status(500).json({
        message: "Affichage Impossible",
        error: err,
  });
    } else {
      res.json(results);
    }
  });
});


app.post('/shows', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO circus_performance SET ?', formData, (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Affichage Impossible",
        error: err,
  });
    } else {
      res.status(200).json({
        res: results
      });
    }
  });
});

app.put('/shows/:id', (req, res) => {
  const idPerformance = req.params.id;
  const formData = req.body;
  connection.query('UPDATE circus_performance SET ? WHERE id = ?', [formData, idPerformance], err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Affichage Impossible",
        error: err,
  });
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/shows/:id', (req, res) => {
  const idPerformance = req.params.id;
  connection.query('DELETE FROM circus_performance WHERE id = ?', [idPerformance], err => {

    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Affichage Impossible",
        error: err,
  });
    } else {
      res.sendStatus(200);
    }
  });
});


app.get('/contact', (req, res) => {
  connection.query('SELECT * from user', (err, results) => {

    if (err) {
      res.status(500).json({
        message: "Contact impossible à récupérer",
        error: err,
  });
    } else {
      res.json(results);
    }
  });
});

app.post('/contact', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO user SET ?', formData, (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Affichage Impossible",
        error: err,
  });
    } else {
      res.status(200);
    }
  });
});

app.put('/contact/:id', (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query('UPDATE user SET ? WHERE id = ?', [formData, idUser], err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Affichage Impossible",
        error: err,
  });
    } else {
      res.status(200);
    }
  });
});














app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});