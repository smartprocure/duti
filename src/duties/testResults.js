let { log } = require('../utils')

let hasTestErrors = ({ testResults, fail }) => {
  if (testResults && testResults.numFailedTests > 0) {
    log(fail)(
      'This PR has failing tests. Please alleviate the errors and commit them',
    )
  }
}

module.exports = {
  hasTestErrors,
}
