/* eslint-disable no-console */

let fs = require('fs')
let Promise = require('bluebird')
let path = require('path')
let pkgup = require('pkg-up')
let _ = require('lodash/fp')
let F = require('futil-js')

Promise.promisifyAll(fs)

let log = _.curry(
  (fn, str) =>
    (process.env.NODE_ENV !== 'test' &&
      console.log(`[${`${fn.name}`.toUpperCase()}] ${str}`)) ||
    fn(str),
)

let readFileIfExists = async path =>
  fs.existsSync(path) ? fs.readFileAsync(path, 'utf8') : undefined

let fileToJson = F.unless(_.isNil, JSON.parse)

let getRunningDirectory = async () => path.dirname(await pkgup())

let readJsonFile = async filePath =>
  fileToJson(await readFileIfExists(path.resolve(filePath)))

let getLintResults = async ({ config: { lintResultsPath } }) =>
  readJsonFile(
    path.resolve(
      await getRunningDirectory(),
      lintResultsPath,
      'lint-results.json',
    ),
  )

let getTestResults = async ({ config: { testResultsPath } }) =>
  readJsonFile(
    path.resolve(
      await getRunningDirectory(),
      testResultsPath,
      'test-results.json',
    ),
  )

module.exports = {
  log,
  fileToJson,
  getLintResults,
  readFileIfExists,
  getTestResults,
  getRunningDirectory,
  readJsonFile,
}
