const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware')

const database = require('./database/dbConnect');

const peepRouter = require('./routes/peep_router');
const userRouter = require('./routes/user_router');

const app = express();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: [
      'http://localhost:3000'
    ],
    credentials: true
  }));

  app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
}

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database.dbConnect()
  .on('error', (error) => console.log('Error: ', error))

app.use('/api/peeps', peepRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "client/build")));

  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });  
};

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})