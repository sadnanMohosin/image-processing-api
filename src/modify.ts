const fs = require('fs');
const sharp = require('sharp');

module.exports = function resize(path, format, width, height) {
  const readStream = fs.createReadStream(path);
  let convert = sharp();

  if (format) {
    convert = convert.toFormat(format);
  }

  if (width || height) {
    convert = convert.resize(width, height, { fit: 'fill' });
  }

  return readStream.pipe(convert);
};
