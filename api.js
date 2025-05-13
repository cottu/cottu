const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = []; // Array in memoria per i libri

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Aggiungi un nuovo libro
app.post('/book', (req, res) => {
  const book = req.body;
  if (!book.isbn || !book.title || !book.author) {
    return res.status(400).send('Dati del libro mancanti');
  }
  books.push(book);
  res.status(201).send('Libro aggiunto con successo');
});

// Ottieni tutti i libri
app.get('/books', (req, res) => {
  res.json(books);
});

// Modifica un libro esistente tramite ISBN
app.put('/book/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const index = books.findIndex(b => b.isbn === isbn);

  if (index === -1) {
    return res.status(404).send('Libro non trovato');
  }

  books[index] = { ...books[index], ...req.body };
  res.send('Libro aggiornato con successo');
});

// Cancella un libro tramite ISBN
app.delete('/book/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const index = books.findIndex(b => b.isbn === isbn);

  if (index === -1) {
    return res.status(404).send('Libro non trovato');
  }

  books.splice(index, 1);
  res.send('Libro cancellato con successo');
});

app.listen(port, () => {
  console.log(`API REST avviata su http://localhost:${port}`);
});
