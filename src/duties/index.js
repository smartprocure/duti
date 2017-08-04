let pr = require('./pr')
let lint = require('./lint')
let testResults = require('./testResults')

module.exports = Object.assign({}, pr, lint, testResults)
