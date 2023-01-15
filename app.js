var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoClient = require('mongodb').MongoClient;
var router = require('express').Router();
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var cors = require('cors');
var carsRouter = require('./routes/cars.route');

var app = express();

var mongoClient = require('mongodb').MongoClient;

const DB_USER = 'toky-sandratra';
const DB_PASSWORD = 'tokysandratra';
const DB_NAME = 'garage-mean';
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@garage-mean.bso1tcr.mongodb.net/?retryWrites=true&w=majority`;

const database = new mongoClient(CONNECTION_STRING);

async function connectDb() {
    await database.connect();
    console.log('Connected to database');
}

connectDb();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.get('/api-status', (req, res) => res.json({ status: 'API is OK ' }));
app.use('/cars', carsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

module.exports = app;