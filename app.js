'use strict';

const express = require('express');
const morgan = require('morgan');
const output = require('./books.js');

const app = express();
app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { sort = '', genres } = req.query;

  const filteredSort = sort || sort.charAt(0).toUpperCase() + sort.slice(1);
  const filteredGenres = genres.charAt(0).toUpperCase() + genres.slice(1);
  let books = output;

  switch (sort) {
  case '':
    books;
    break;
  case 'rating':
    books = books.sort((a, b) => {
      return a[filteredSort] > b[filteredSort] ? 1 : a[filteredSort] < b[filteredSort] ? -1 : 0;
    });
    break;
  case 'app':
    books = books.sort((a, b) => {
      return a[filteredSort] > b[filteredSort] ? 1 : a[filteredSort] < b[filteredSort] ? -1 : 0;
    });
    break;
  default:
    res
      .status(400)
      .send('Please enter a valid search: rating, app, or leave it blank.');
  }

  if (genres) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(filteredGenres)) {
      return res
        .status(400)
        .send('Genres must be either action, puzzle, strategy, casual, arcade, or card.');
    }
    books = books.filter(book => {
      console.log(book['Genres']);
      return book['Genres']
        .includes(filteredGenres);
    });
  }
  res.send(books);
});

app.listen(8000, () => {
  console.log('Listening on PORT 8000');
});