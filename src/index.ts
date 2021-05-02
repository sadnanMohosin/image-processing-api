const express = require('express');
const cases = require('fs');
// eslint-disable-next-line import/no-unresolved
const modify = require('./modify.ts');

const app = express();
app.get('/', function (req, res) {
  // Get the query-parameter
  const filesName = req.query.name;
  const stringWide = req.query.width;
  const stringLength = req.query.height;
  const filesFormat = req.query.format;
  // Need to make it interger
  let wide;
  let length;
  if (stringWide) {
    // eslint-disable-next-line radix
    wide = parseInt(stringWide);
    if (wide < 20) {
      res.send('<h1>File size is too small</h1>');
      return;
    }
  }
  if (stringLength) {
    // eslint-disable-next-line radix
    length = parseInt(stringLength);
    if (length < 20) {
      res.send('<h1>File size is too small</h1>');
      return;
    }
  }
  const fileOutput = `${wide}x${length}-${filesName}`;
  // Error handaling
  cases.access(`./images/${filesName}`, cases.constants.F_OK, function (err) {
    if (err) {
      res.send('<h1>Image does not Exist</h1>');
      return;
    }
    res.type(`image/${filesFormat || 'png'}`);
    modify(`./images/${filesName}`, filesFormat, wide, length).pipe(res);
    modify(`./images/${filesName}`, filesFormat, wide, length).toFile(
      `./upload/${fileOutput}`
    );
  });
});
app.listen(200, function () {
  console.log('Server is up and working !');
});
