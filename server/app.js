const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
require('dotenv').config({path: '../.env'})

const peepRouter = require('./routes/peep_router');
const usersRouter = require('./routes/users');
require('./database/dbConnect')

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/peeps', peepRouter);

module.exports = app;
