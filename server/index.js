const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'mysql_db',           // host name         => MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER',         // database user     => MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database password => MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'books',          // database name     => MYSQL_HOST_IP: mysql_db
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hi there!!');
});

app.get('/get', (req, res) => {
    const SelectQuery = `SELECT * FROM books_reviews`;
    db.query(SelectQuery, (err, result) => {
        res.send(result);
    });
});

app.post('/add', (req, res) => {
    const bookName= req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = `INSERT INTO books_reviews (book_name, book_review) VALUES (?,?)`;
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
        console.log(result)
    });
});

app.delete('/delete/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = `DELETE FROM books_reveiws WHERE id = ?`;
    db.query(DeleteQuery, bookId, (err, result) => {
        if (err) {
            console.log(err);
        };
    });
});

app.put('/update/:bookId', (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.body.bookId;
    const UpdateQuery = `UPDATE books_reviews SET book_review = ? WHERE id = ?`;
    db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
        if (err) {
            console.log(err);
        };
    });
});

app.listen('3001', () => {});

