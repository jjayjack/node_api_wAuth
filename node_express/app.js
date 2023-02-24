const express = require('express');
const morgan = require('morgan');

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

// Tours HTTP methods

//User HTTP methods

// Mounting new Router on a Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//update to Routes using Middleware

// Routes
/*
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);
*/

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`App on ${port}`);
});
