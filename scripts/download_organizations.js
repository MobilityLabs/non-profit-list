// @flow
require('dotenv').config({silent: true});
const _ = require('lodash');
const fs = require('fs');
const https = require('https');
const tmpDir = process.env.TMP_DIR || './tmp';

console.log('Starting download to ' + tmpDir); // eslint-disable-line

// This downloads all US organizations
const stateCodes = [
  "al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id", "il", "in", "ia",
  "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm",
  "ny", "nc", "nd", "oh", "ok", "or", "pa", "pr", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va",
  "wa", "wv", "wi", "wy"];

const missingFiles = [];
let intervalId;
let counter = 0;

const downloadMissingFile = (fileNames) => {
  if (fileNames[counter] === undefined) {clearInterval(intervalId); return;}
  const url = 'https://www.irs.gov/pub/irs-soi/' + fileNames[counter];
  const file = fs.createWriteStream(tmpDir + fileNames[counter]);
  https.get(url, (response) => {
    response.pipe(file);
  });
  console.log('Downloaded ' + fileNames[counter]); // eslint-disable-line
  counter++;
};

fs.readdir(tmpDir, (err, files) => {
  stateCodes.forEach((code) => {
    const fileName = 'eo_' + code + '.csv';
    if (_.includes(files, fileName)) {
      return;
    }
    missingFiles.push(fileName);
  });
  intervalId = setInterval(downloadMissingFile, 3000, missingFiles);
});


console.log('Done downloading to ' + tmpDir); // eslint-disable-line
