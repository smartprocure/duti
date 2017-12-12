let _ = require('lodash/fp')
let { basename } = require('path')
let { linkifyPath } = require('../utils')

let messageTemplate = message => `
  <strong>${message.message}</strong>
  <code>Line ${message.line}${message.source
  ? `: ${message.source.trim()}`
  : ''}</code>`

let formatLintMessages = _.flow(_.map(messageTemplate), _.join('\n'))

let lintTemplate = (severity, danger) => lint => `
<details>
  <summary>${basename(lint.filePath)}</summary>
  <p>${linkifyPath({ danger, path: lint.filePath })}</p>
  ${formatLintMessages(
    severity ? _.filter({ severity }, lint.messages) : lint.messages
  )}
</details>`

let formatLint = (severity, danger) =>
  _.flow(
    _.filter(lint => _.some({ severity }, lint.messages)),
    _.map(lintTemplate(severity, danger)),
    _.join('')
  )

let formatStandardJSLint = danger =>
  _.flow(_.map(lintTemplate(undefined, danger)), _.join(''))

let hasLintErrors = ({ lintResults, fail, message, danger }) => {
  if (_.isNil(lintResults)) {
    message('Could not find any lint results')
    return
  }
  let isStandardOutput = _.flow(
    _.filter('messages'),
    _.filter(['errorCount', 0]),
    _.isEmpty
  )(lintResults)

  if (isStandardOutput) {
    if (lintResults && lintResults.length > 0) {
      fail(`Your PR has lint errors. Please fix these and commit them.
        ${formatStandardJSLint(danger)(lintResults)}`)
    }
  } else if (_.sumBy('errorCount', lintResults) > 0) {
    fail(`Your PR has lint errors. Please fix these and commit them.
      ${formatLint(2, danger)(lintResults)}`)
  }
}

let hasLintWarnings = ({ lintResults, warn, message, danger }) => {
  if (_.isNil(lintResults)) {
    message('Could not find any lint results')
    return
  }
  if (_.sumBy('warningCount', lintResults) > 0) {
    warn(
      `Your PR has lint warnings. Please consider fixing these.
      ${formatLint(1, danger)(lintResults)}`
    )
  }
}

module.exports = {
  hasLintErrors,
  hasLintWarnings,
}
