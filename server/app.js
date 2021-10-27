const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');

const database = require('./database/dbConnect')

const peepRouter = require('./routes/peep_router');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

database.dbConnect()

app.use('/peeps', peepRouter);

module.exports = app;
