/* eslint-disable no-console */

let fs = require('fs')
let Promise = require('bluebird')
let path = require('path')
let pkgup = require('pkg-up')

Promise.promisifyAll(fs)

let log = fn => str =>
  (process.env.NODE_ENV !== 'test' &&
    console.log(`[${`${fn.name}`.toUpperCase()}] ${str}`)) ||
  fn(str)

let checkFileExists = async path =>
  fs.existsSync(path) ? fs.readFileAsync(path, 'utf8') : undefined

let getLintResults = async ({ config: { lintResultsPath } }) =>
  checkFileExists(
    path.resolve(
      path.dirname(await pkgup()),
      lintResultsPath,
      'lint-results.json',
    ),
  )

let getTestResults = async ({ config: { testResultsPath } }) =>
  checkFileExists(
    path.resolve(
      path.dirname(await pkgup()),
      testResultsPath,
      'test-results.json',
    ),
  )

module.exports = {
  log,
  getLintResults,
  checkFileExists,
  getTestResults,
}
