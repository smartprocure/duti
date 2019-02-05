let _ = require('lodash/fp')
let stripAnsi = require('strip-ansi')
let { pathTail, linkifyPath } = require('../utils')

let resultTemplate = (isMocha, danger) => (r, rootFolder) => `<details>
  <summary>${
    isMocha
      ? r.title
      : linkifyPath({ path: pathTail(r.name, rootFolder), danger })
  }</summary>
  <code>${isMocha ? r.err.message : stripAnsi(r.message)}</code>
</details>`

let hasTestErrors = ({ fail, danger }) => (testResults, rootFolder = '.') => {
  let isMocha = _.get('stats', testResults)
  if (
    testResults &&
    (isMocha ? testResults.stats.failures : testResults.numFailedTests) > 0
  ) {
    _.flow(
      _.reject(result => _.isEmpty(isMocha ? result.err : result.message)),
      _.map(r => resultTemplate(isMocha, danger)(r, rootFolder)),
      _.join('\n'),
      allFailures =>
        `This PR has failing tests. Please alleviate the errors and commit them\n\n${allFailures}`,
      fail
    )(isMocha ? testResults.tests : testResults.testResults)
  }
}

module.exports = {
  hasTestErrors,
}
