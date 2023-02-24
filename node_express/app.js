const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  console.log('made it!');
  req.requestTime = new Date().toISOString();
  next();
});

// Mounting new Router on a Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start Server
module.exports = app;
