let _ = require('lodash/fp')
let pr = require('./pr')
let lint = require('./lint')
let testResults = require('./testResults')
let library = require('./library')
let autoFix = require('./autoFix')
let browserResults = require('./browserResults')

let api = Object.assign(
  {},
  pr,
  lint,
  testResults,
  browserResults,
  library,
  autoFix
)
module.exports = globals => _.mapValues(f => f(globals), api)
