const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject({ message: 'I could not find the source file...' });
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject({ message: 'Could not write file' });
      resolve('success!');
    });
  });
};

// Async / Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const allPromises = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const images = allPromises.map((el) => el.body.message);
    console.log(images);

    await writeFilePro('dog-img.txt', images.join('\n'));
    console.log('New dog image saved!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: Ready!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!';
};

(async () => {
  try {
    console.log('1: Will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('Error AHHHHH');
  }
})();

/*
console.log('1: Will get dog pics');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics');
  })
  .catch((err) => console.log(err, 'AHHHHHH'));
*/

/*
// Callback hell --again
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFileProp('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('New dog image saved!');
  })
  .catch((err) => {
    console.log(err);
  });
*/

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
