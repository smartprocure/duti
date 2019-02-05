let _ = require('lodash/fp')
let { basename } = require('path')
let { linkifyPath, pathTail } = require('../utils')

let messageTemplate = message => `
  <strong>${message.message}</strong>
  <code>Line ${message.line}${
  message.source ? `: ${message.source.trim()}` : ''
}</code>`

let formatLintMessages = _.flow(
  _.map(messageTemplate),
  _.join('\n')
)

let lintTemplate = (severity, danger) => (lint, rootFolder) => `
<details>
  <summary>${basename(lint.filePath)}</summary>
  <p>${linkifyPath({
    danger,
    path: pathTail(lint.filePath, rootFolder),
  })}</p>
  ${formatLintMessages(
    severity ? _.filter({ severity }, lint.messages) : lint.messages
  )}
</details>`

let formatLint = (severity, danger) => (lintResults, rootFolder) =>
  _.flow(
    _.filter(lint => _.some({ severity }, lint.messages)),
    _.map(v => lintTemplate(severity, danger)(v, rootFolder)),
    _.join('')
  )(lintResults)

let formatStandardJSLint = danger => (lintResults, rootFolder) =>
  _.flow(
    _.map(v => lintTemplate(undefined, danger)(v, rootFolder)),
    _.join('')
  )(lintResults)

let hasLintErrors = ({ fail, message, danger }) => (lintResults, rootFolder = '.') => {
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
        ${formatStandardJSLint(danger)(lintResults, rootFolder)}`)
    }
  } else if (_.sumBy('errorCount', lintResults) > 0) {
    fail(`Your PR has lint errors. Please fix these and commit them.
      ${formatLint(2, danger)(lintResults, rootFolder)}`)
  }
}

let hasLintWarnings = ({ warn, message, danger }) => (lintResults, rootFolder = '.') => {
  if (_.isNil(lintResults)) {
    message('Could not find any lint results')
    return
  }
  if (_.sumBy('warningCount', lintResults) > 0) {
    warn(
      `Your PR has lint warnings. Please consider fixing these.
      ${formatLint(1, danger)(lintResults, rootFolder)}`
    )
  }
}

module.exports = {
  hasLintErrors,
  hasLintWarnings,
}
