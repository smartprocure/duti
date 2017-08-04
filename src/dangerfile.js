/* global danger fail warn */
let config = require('./config')
let duties = require('./')
let { getLintResults, getTestResults } = require('./utils')

for (let duti in duties) {
  let runAllFuncs = async () => {
    let lintResults = await getLintResults({ config })
    let testResults = await getTestResults({ config })
    await duties[duti]({ danger, fail, warn, config, lintResults, testResults })
  }
  runAllFuncs()
}
