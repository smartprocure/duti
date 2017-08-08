let _ = require('lodash/fp')
let stripAnsi = require('strip-ansi')
let { basename } = require('path')

let resultTemplate = (r, isMocha) => `<details>
  <summary>${isMocha ? r.title : basename(r.name)}</summary>
  <code>${isMocha ? r.err.message : stripAnsi(r.message)}</code>
</details>`

let hasTestErrors = ({ testResults, fail }) => {
  let isMocha = _.get('stats', testResults)
  if (
    testResults &&
    (isMocha ? testResults.stats.failures : testResults.numFailedTests) > 0
  ) {
    _.flow(
      _.reject(result => _.isEmpty(isMocha ? result.err : result.message)),
      _.map(res => resultTemplate(res, isMocha)),
      _.join('\n'),
      allFailures =>
        `This PR has failing tests. Please alleviate the errors and commit them\n\n${allFailures}`,
      fail,
    )(isMocha ? testResults.tests : testResults.testResults)
  }
}

module.exports = {
  hasTestErrors,
}
