const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that...');
      resolve(data);
    });
  });
};

readFilePro(`${__dirname}/dog.txt`).then((data) => {
  console.log(`Breed: ${data}`);

  return superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      return fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
    })
    .catch((err) => {
      console.log('line 32', err.message);
    });
});

/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  // Call back hell
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('Random dog image saved to file!');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
*/
