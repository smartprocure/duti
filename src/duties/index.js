let pr = require('./pr');
let lint = require('./lint');
let testResults = require('./testResults');
let library = require('./library');
let autoFix = require('./autoFix');
let browserResults = require('./browserResults');

module.exports = Object.assign(
  {},
  pr,
  lint,
  testResults,
  browserResults,
  library,
  autoFix
);
