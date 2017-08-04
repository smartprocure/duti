let hasErrors = ({ lintResults, fail }) => {
  if (
    lintResults &&
    lintResults.reduce((acc, curr) => acc + curr.errorCount, 0) > 0
  ) {
    fail('Your PR has lint errors. Please fix these and commit them.')
  }
}

let hasWarnings = ({ lintResults, warn }) => {
  if (
    lintResults &&
    lintResults.reduce((acc, curr) => acc + curr.warningCount, 0) > 0
  ) {
    warn('Your PR has lint warnings. Please consider fixing these.')
  }
}

module.exports = {
  hasErrors,
  hasWarnings,
}
