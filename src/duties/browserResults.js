let _ = require('lodash/fp')

let hasBrowserErrors = ({ fail, message }) => browserResults => {
  if (_.isNil(browserResults)) {
    message('Could not find any browser results.')
    return
  }

  let { result, summary } = browserResults

  if (result && summary) {
    let { error, failed, exitCode } = summary
    if (error === false && failed === 0 && exitCode === 0) {
      message('Your PR has no browser errors. Great job!')
      return
    }

    if (failed > 0) {
      _.flow(
        // Flatten test results into one array.
        _.values,
        _.flatten,
        // Filter by failed tests.
        _.reject({ success: true }),
        // Format error log.
        _.map(
          f => `\nSuite: ${f.suite}\nDescription: ${f.description}\n${f.log}\n`
        ),
        _.concat([`Your PR has ${failed} failed browser tests:`]),
        _.join('\n'),
        fail
      )(result)
      return
    }

    // All other cases: error is not false, exitCode is not 0 etc.
    fail('Browser test error. Please see CI logs for more details.')
  } else {
    message(
      'Incorrect browser result format. Please see CI logs for more details.'
    )
  }
}

module.exports = {
  hasBrowserErrors,
}
