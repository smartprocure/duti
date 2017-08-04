let pr = require('./duties/pr')
let lint = require('./duties/lint')
let testResults = require('./duties/testResults')

module.exports = Object.assign({}, pr, lint, testResults)
