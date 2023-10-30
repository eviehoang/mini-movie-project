const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movies_db'
    },
    (err) => {
        if (err) {
            console.error('Database connection error: ' + err);
        } else {
            console.log('Connected to the movies_db database.');
        }
    }
);

app.get('/', function(req,res){
    res.send('hi!')
});

app.get('/api/movies', (req, res) => {
    db.query('SELECT movie_name FROM movies_db.movies', function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data from the database' });
        } else {
            console.log(results);
            res.json(results);
        }
    });
});

app.get('/api/movie-reviews', (req, res) => {
    db.query('SELECT review FROM movies_db.reviews JOIN movie_name', function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data from the database' });
        } else {
            console.log(results);
            res.json(results);
        }
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.error('Server startup error: ' + err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
