let _ = require('lodash/fp')
let { log, fileNameFromPath } = require('../utils')

let formatLintMessages = messages =>
  _.flow(
    _.map(
      message => `
  <li>
    <strong>${message.message}</strong>
    <br />
    <code>Line ${message.line}: ${message.source.trim()}</code>
  </li>
`,
    ),
    _.join('\n'),
  )(messages)

let formatLint = (lintRes, severity) =>
  _.flow(
    _.filter(
      lint =>
        !_.isEmpty(lint.messages) &&
        _.some(m => m.severity === severity, lint.messages),
    ),
    _.map(
      lint => `
  <details>
    <summary>${fileNameFromPath(lint.filePath)}</summary>
    <ul>${formatLintMessages(
      _.filter(m => m.severity === severity, lint.messages),
    )}</ul>
  </details>`,
    ),
    _.join('\n'),
  )(lintRes)

let hasLintErrors = ({ lintResults, fail }) => {
  if (lintResults && lintResults.reduce((a, c) => a + c.errorCount, 0) > 0) {
    log(fail)(
      `Your PR has lint errors. Please fix these and commit them.
      ${formatLint(lintResults, 2)}`,
    )
  }
}

let hasLintWarnings = ({ lintResults, warn }) => {
  if (lintResults && lintResults.reduce((a, c) => a + c.warningCount, 0) > 0) {
    log(warn)(
      `Your PR has lint warnings. Please consider fixing these.
      ${formatLint(lintResults, 1)}`,
    )
  }
}

module.exports = {
  hasLintErrors,
  hasLintWarnings,
}
