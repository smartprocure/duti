let hasErrors = ({ testResults, fail }) => {
  if (testResults && testResults.numFailedTests > 0) {
    fail(
      'This PR has failing tests. Please alleviate the errors and commit them',
    )
  }
}

module.exports = {
  hasErrors,
}
