let _ = require('lodash/fp')

let hasBrowserErrors = ({ browserResults, fail, message }) => {
  if (_.isNil(browserResults)) {
    message('Could not find any browser results')
    return
  }

  let { result, summary } = browserResults

  if (result && summary) {
    let { error, failed, exitCode } = summary
    if (false === error && 0 === failed && 0 === exitCode) {
      message('Your PR has no browser errors.  Great job!')
      return
    }

    if (failed > 0) {
      let failedTests = []
      _.flow(
        // Get result for each test suite.
        _.mapValues(r => r),
        // Flatten test results into one array.
        _.reduce((flattened, other) => {
          return flattened.concat(other)
        }, failedTests),
        // Filter by failed tests.
        _.filter(testResult => {
          return false === testResult.success
        }),
        // Format error log.
        _.map(
          f => `\nSuite: ${f.suite}\nDescription: ${f.description}\n${f.log}\n`
        ),
        allFailures => {
          fail(
            [`Your PR has ${failed} failed browser tests:`]
              .concat(allFailures)
              .join('\n')
          )
        }
      )(result)
      return
    }

    // All other cases: error is not false, exitCode is not 0 etc.
    fail('Browser test error.  Please see CI logs for more details.')
  } else {
    message(
      'Incorrect browser result format.  Please see CI logs for more details.'
    )
  }
}

module.exports = {
  hasBrowserErrors: hasBrowserErrors,
}
