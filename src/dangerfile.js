/* global danger fail warn */
let config = require('./config')
let duties = require('./')
let { getLintResults, getTestResults } = require('./utils')

for (let duti in duties) {
  let runAllFuncs = async () => {
    let lintResults = getLintResults({ config })
    let testResults = getTestResults({ config })
    await duties[duti]({ danger, fail, warn, config, lintResults, testResults })
  }
  runAllFuncs()
}
