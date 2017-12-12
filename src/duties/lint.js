let _ = require('lodash/fp')
let { basename } = require('path')
let { linkifyPath, pathTail } = require('../utils')

let messageTemplate = message => `
  <strong>${message.message}</strong>
  <code>Line ${message.line}${message.source
  ? `: ${message.source.trim()}`
  : ''}</code>`

let formatLintMessages = _.flow(_.map(messageTemplate), _.join('\n'))

let lintTemplate = (severity, danger, config) => lint => `
<details>
  <summary>${basename(lint.filePath)}</summary>
  <p>${linkifyPath({
    danger,
    path: pathTail(lint.filePath, config),
  })}</p>
  ${formatLintMessages(
    severity ? _.filter({ severity }, lint.messages) : lint.messages
  )}
</details>`

let formatLint = (severity, danger, config) =>
  _.flow(
    _.filter(lint => _.some({ severity }, lint.messages)),
    _.map(lintTemplate(severity, danger, config)),
    _.join('')
  )

let formatStandardJSLint = (danger, config) =>
  _.flow(_.map(lintTemplate(undefined, danger, config)), _.join(''))

let hasLintErrors = ({ lintResults, fail, message, danger, config }) => {
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
        ${formatStandardJSLint(danger, config)(lintResults)}`)
    }
  } else if (_.sumBy('errorCount', lintResults) > 0) {
    fail(`Your PR has lint errors. Please fix these and commit them.
      ${formatLint(2, danger, config)(lintResults)}`)
  }
}

let hasLintWarnings = ({ lintResults, warn, message, danger, config }) => {
  if (_.isNil(lintResults)) {
    message('Could not find any lint results')
    return
  }
  if (_.sumBy('warningCount', lintResults) > 0) {
    warn(
      `Your PR has lint warnings. Please consider fixing these.
      ${formatLint(1, danger, config)(lintResults)}`
    )
  }
}

module.exports = {
  hasLintErrors,
  hasLintWarnings,
}
