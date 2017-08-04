let { log } = require('../utils')

let hasLintErrors = ({ lintResults, fail }) => {
  if (
    lintResults &&
    lintResults.reduce((acc, curr) => acc + curr.errorCount, 0) > 0
  ) {
    log(fail)('Your PR has lint errors. Please fix these and commit them.')
  }
}

let hasLintWarnings = ({ lintResults, warn }) => {
  if (
    lintResults &&
    lintResults.reduce((acc, curr) => acc + curr.warningCount, 0) > 0
  ) {
    log(warn)('Your PR has lint warnings. Please consider fixing these.')
  }
}

module.exports = {
  hasLintErrors,
  hasLintWarnings,
}
