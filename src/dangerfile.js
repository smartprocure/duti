/* global danger fail warn */
let config = require('./config')
let duties = require('./')
;(async () => {
  for (let duti in duties) {
    await duties[duti]({ danger, fail, warn, config })
  }
})()
