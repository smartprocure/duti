let _ = require('lodash/fp')
let stripAnsi = require('strip-ansi')
let { basename } = require('path')

let resultTemplate = r => `<details>
  <summary>${basename(r.name)}</summary>
  ${stripAnsi(r.message)}
</details>`

let hasTestErrors = ({ testResults, fail }) => {
  if (testResults && testResults.numFailedTests > 0) {
    _.flow(
      _.reject(result => _.isEmpty(result.message)),
      _.map(resultTemplate),
      _.join('\n'),
      allFailures =>
        `This PR has failing tests. Please alleviate the errors and commit them\n\n${allFailures}`,
      fail,
    )(testResults.testResults)
  }
}

module.exports = {
  hasTestErrors,
}
