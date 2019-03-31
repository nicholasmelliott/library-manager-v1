const express = require('express');
const app = express();

app.listen(3000);

// app.use(bodyParser.urlencoded({ extended : false }));

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res, next) => {
	res.render('home');
});

app.get('/books/new', (req, res, next) => {
	res.render('new_book');
});

//nav
app.get('/books', (req, res, next) => {
	res.render('all_books.pug');
});

app.get('/patrons', (req, res, next) => {
	res.render('all_patrons.pug');
});

app.get('/loans', (req, res, next) => {
	res.render('all_loans.pug');
});