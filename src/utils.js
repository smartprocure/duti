/* eslint-disable no-console */

let fs = require('fs')
let Promise = require('bluebird')
let path = require('path')
let pkgup = require('pkg-up')
let _ = require('lodash/fp')

Promise.promisifyAll(fs)

let log = fn => str =>
  (process.env.NODE_ENV !== 'test' &&
    console.log(`[${`${fn.name}`.toUpperCase()}] ${str}`)) ||
  fn(str)

let stripAnsi = str =>
  str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    '',
  )

let fileNameFromPath = (str, del = '/') => _.flow(_.split(del), _.last)(str)

let checkFileExists = async path =>
  fs.existsSync(path) ? fs.readFileAsync(path, 'utf8') : undefined

let fileToJson = contents =>
  contents !== undefined ? JSON.parse(contents) : contents

let getLintResults = async ({ config: { lintResultsPath } }) =>
  fileToJson(
    await checkFileExists(
      path.resolve(
        path.dirname(await pkgup()),
        lintResultsPath,
        'lint-results.json',
      ),
    ),
  )

let getTestResults = async ({ config: { testResultsPath } }) =>
  fileToJson(
    await checkFileExists(
      path.resolve(
        path.dirname(await pkgup()),
        testResultsPath,
        'test-results.json',
      ),
    ),
  )

module.exports = {
  log,
  fileToJson,
  getLintResults,
  checkFileExists,
  getTestResults,
  stripAnsi,
  fileNameFromPath,
}
