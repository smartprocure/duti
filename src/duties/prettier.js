let fs = require('fs')
let path = require('path')
let Promise = require('bluebird')
let _ = require('lodash/fp')
let prettier = require('prettier')
let { fileToString } = require('../utils')

Promise.promisifyAll(fs)

let prettierCfg = { semi: false, singleQuote: true, trailingComma: 'all' }

let notPrettierErrorTemplate = file => `
  <code>${file}</code>
`

let detectPrettier = async ({ danger, warn }) => {
  let allJsFiles = _.filter(p => path.extname(p) === '.js')(
    _.concat(danger.git.created_files, danger.git.modified_files),
  )
  if (allJsFiles.length) {
    let uglyFiles = await _.flow(
      _.filter(p => path.extname(p) === '.js'),
      _.filter(async p =>
        prettier.check(`${await fileToString(p)}`, prettierCfg),
      ),
    )(allJsFiles)
    if (uglyFiles.length) {
      warn(`Some files were not formatted using Prettier. Please run prettier on them.
${_.flow(_.map(notPrettierErrorTemplate), _.join('\n\n'))(uglyFiles)}
      `)
    }
  }
}

module.exports = {
  detectPrettier,
}
