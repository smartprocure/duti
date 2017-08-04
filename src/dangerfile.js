/* global danger fail warn schedule message */
let _ = require('lodash/fp')
let Promise = require('bluebird')
let config = require('./config')
let duties = require('./duties')
let { getLintResults, getTestResults } = require('./utils')

schedule(async () => {
  let lintResults = await getLintResults({ config })
  let testResults = await getTestResults({ config })

  return Promise.all(
    _.map(async duti => {
      await duti({
        danger,
        fail,
        warn,
        config,
        message,
        lintResults,
        testResults,
      })
    }, duties),
  )
})
