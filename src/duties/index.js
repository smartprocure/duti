let pr = require('./pr')
let lint = require('./lint')
let testResults = require('./testResults')
let library = require('./library')
let prettier = require('./prettier')

module.exports = Object.assign({}, pr, lint, testResults, library, prettier)
