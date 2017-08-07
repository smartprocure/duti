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

let fileNameFromPath = (str, del = '/') => _.flow(_.split(del), _.last)(str)

let readFileIfExists = async path =>
  fs.existsSync(path) ? fs.readFileAsync(path, 'utf8') : undefined

let fileToJson = F.unless(_.isNil, JSON.parse)

let getRunningDirectory = async () => path.dirname(await pkgup())

let getLintResults = async ({ config: { lintResultsPath } }) =>
  fileToJson(
    await readFileIfExists(
      path.resolve(
        await getRunningDirectory(),
        lintResultsPath,
        'lint-results.json',
      ),
    ),
  )

let getTestResults = async ({ config: { testResultsPath } }) =>
  fileToJson(
    await readFileIfExists(
      path.resolve(
        await getRunningDirectory(),
        testResultsPath,
        'test-results.json',
      ),
    ),
  )

module.exports = {
  log,
  fileToJson,
  getLintResults,
  readFileIfExists,
  getTestResults,
  fileNameFromPath,
  getRunningDirectory,
}
