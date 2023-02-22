const express = require('express');

const app = express();

/*
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.json({ message: 'you can post to this endpoint' });
});
*/

const port = 3000;
app.listen(port, () => {
  console.log(`App on ${port}`);
});
