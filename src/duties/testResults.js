let _ = require('lodash/fp')
let { log, stripAnsi, fileNameFromPath } = require('../utils')

let resultTemplate = r => `<details>
  <summary>${fileNameFromPath(r.name)}</summary>
  ${stripAnsi(r.message)}
</details>`

let hasTestErrors = ({ testResults, fail }) => {
  if (testResults && testResults.numFailedTests > 0) {
    let allFailures = _.flow(
      _.filter(result => !_.isEmpty(result.message)),
      _.map(resultTemplate),
      _.join('\n'),
    )(testResults.testResults)

    log(fail)(
      `This PR has failing tests. Please alleviate the errors and commit them\n\n${allFailures}`,
    )
  }
}

module.exports = {
  hasTestErrors,
}
