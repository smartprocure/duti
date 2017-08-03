/* global danger fail warn */

let duties = require('./')
;(async () => {
  for (let duti in duties) {
    await duties[duti]({ danger, fail, warn })
  }
})()
