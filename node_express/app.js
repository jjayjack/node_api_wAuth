const express = require('express');
const fs = require('fs');

const app = express();
// Middleware
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Reformatting
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    date: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

const createTour = (req, res) => {
  const newId = tours[tours.legnth - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    console.log(err);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here..>' },
  });
};

const deleteTour = (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// Refactor for changes in path
app.route('/api/v1/tours').get(getAllTours).post(createTour);

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App on ${port}`);
});
