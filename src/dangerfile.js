/* global danger fail warn schedule message */
let _ = require("lodash/fp");
let Promise = require("bluebird");
let config = require("./config");
let duties = require("./duties");
let { getLintResults, getTestResults, log } = require("./utils");

schedule(async () =>
  Promise.all(
    _.over(_.values(duties))({
      danger,
      fail: log(fail),
      warn: log(warn),
      config,
      message: log(message),
      lintResults: await getLintResults({ config }),
      testResults: await getTestResults({ config })
    })
  )
);
