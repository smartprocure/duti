/* global danger fail warn schedule message */
let _ = require('lodash/fp')
let Promise = require('bluebird')
let cosmiconfig = require('cosmiconfig')
let defaultConfig = require('../.dutirc.json')
let duties = require('./duties')
let { getLintResults, getTestResults, log } = require('./utils')

let explorer = cosmiconfig('duti', { rcExtensions: true, sync: true })

schedule(async () => {
  let userConfig
  try {
    // eslint-disable-next-line no-console
    console.log(typeof process.cwd())
    userConfig = await explorer.load(process.cwd())
  } catch (e) {
    throw new Error(e)
  }

  // eslint-disable-next-line no-console
  console.log(
    userConfig ? 'Using user configuration' : 'Using default configuration'
  )

  let config = userConfig || defaultConfig

  // eslint-disable-next-line no-console
  console.log(config)

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
