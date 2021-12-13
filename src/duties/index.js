// eslint-disable-next-line lodash-fp/use-fp
let _ = require('lodash')
let pr = require('./pr')
let lint = require('./lint')
let testResults = require('./testResults')
let library = require('./library')
let autoFix = require('./autoFix')
let browserResults = require('./browserResults')

module.exports = _.assign(
  {},
  pr,
  lint,
  testResults,
  browserResults,
  library,
  autoFix
)
