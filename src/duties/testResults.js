let _ = require('lodash/fp')
let stripAnsi = require('strip-ansi')
let { basename } = require('path')
let { log } = require('../utils')

let resultTemplate = r => `<details>
  <summary>${basename(r.name)}</summary>
  ${stripAnsi(r.message)}
</details>`

let hasTestErrors = ({ testResults, fail }) => {
  if (testResults && testResults.numFailedTests > 0) {
    let allFailures = _.flow(
      _.reject(result => _.isEmpty(result.message)),
      _.map(resultTemplate),
      _.join('\n'),
    )(testResults.testResults)

    log(
      fail,
      `This PR has failing tests. Please alleviate the errors and commit them\n\n${allFailures}`,
    )
  }
}

module.exports = {
  hasTestErrors,
}
