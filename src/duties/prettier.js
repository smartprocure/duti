let fs = require('fs')
let path = require('path')
let Promise = require('bluebird')
let _ = require('lodash/fp')
let prettier = require('prettier')
let { fileToString } = require('../utils')

Promise.promisifyAll(fs)

let prettierCfg = { semi: false, singleQuote: true, trailingComma: 'all' }

let notPrettierErrorTemplate = async file => `
  <details>
    <summary><code>${file}</code></summary>
    Here it is Prettified:

    <pre>
      ${await prettier.format(await fileToString(file), prettierCfg)}
    </pre>
  </details>
`

let detectPrettier = async ({ danger, warn }) => {
  let allJsFiles = _.filter(
    p => /\.jsx?$/g.test(path.extname(p)),
    _.concat(danger.git.created_files, danger.git.modified_files),
  )
  if (allJsFiles.length) {
    let uglyFiles = await _.flow(
      _.filter(async p => prettier.check(await fileToString(p), prettierCfg)),
    )(allJsFiles)
    if (uglyFiles.length) {
      warn(`Some files were not formatted using Prettier. Please run prettier on them.
${_.flow(_.map(notPrettierErrorTemplate), await Promise.all, _.join('\n'))(
        uglyFiles,
      )}
      `)
    }
  }
}

module.exports = {
  detectPrettier,
}
