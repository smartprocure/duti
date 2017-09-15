/* global danger fail warn schedule message */
let _ = require('lodash/fp')
let Promise = require('bluebird')
let cosmiconfig = require('cosmiconfig')
let defaultConfig = require('../duti.config')
let duties = require('./duties')
let { getLintResults, getTestResults, log } = require('./utils')

let explorer = cosmiconfig('duti', { rcExtensions: true })

schedule(async () => {
  let userConfig
  try {
    userConfig = await explorer.load()
  } catch (e) {
    throw new Error(e)
  }

  let config = userConfig || defaultConfig

  return Promise.all(
    _.over(_.values(duties))({
      danger,
      fail: log(fail),
      warn: log(warn),
      config,
      message: log(message),
      lintResults: await getLintResults({ config }),
      testResults: await getTestResults({ config }),
    })
  )
})
