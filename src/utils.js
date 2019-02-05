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
    fn(str)
)

let readFileIfExists = async path =>
  fs.existsSync(path) ? fs.readFileAsync(path, 'utf8') : undefined

let fileToJson = F.unless(_.isNil, JSON.parse)

let getRunningDirectory = async () => path.dirname(await pkgup())

let readJsonFile = async filePath =>
  fileToJson(await readFileIfExists(filePath))

let readLocalJsonFile = file => async dir => {
  let contents = await readFileIfExists(
    path.resolve(await getRunningDirectory(), dir, file)
  )
  try {
    return fileToJson(contents)
  } catch (e) {
    console.info({ contents })
    throw new Error(contents)
  }
}

let getLintResults = readLocalJsonFile('lint-results.json')
let getTestResults = readLocalJsonFile('test-results.json')
let getBrowserResults = readLocalJsonFile('browser-results.json')

let linkifyPath = ({ danger, path }) => {
  let repoUrl = danger.github.pr.head.repo.html_url
  let ref = danger.github.pr.head.ref
  return `<a href="${repoUrl}/blob/${ref}/${path}" target="_blank">${path}</a>`
}

let pathTail = (path, rootFolder) =>
  path.substr(path.indexOf(rootFolder) || 0)

module.exports = {
  log,
  fileToJson,
  getLintResults,
  readFileIfExists,
  getTestResults,
  getBrowserResults,
  getRunningDirectory,
  readJsonFile,
  linkifyPath,
  pathTail,
}
