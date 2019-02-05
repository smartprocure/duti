/* global danger schedule message fail warn markdown */

let {
  getLintResults,
  getTestResults,
  getBrowserResults,
  log,
} = require('./src/utils')

let duties = require('./src/duties')({
  danger,
  schedule,
  fail: log(fail),
  warn: log(warn),
  markdown: log(markdown),
  message: log(message),
})

let prNetChangeThreshold = 500
let personalityNetChangeThreshold = 500
let recommendedPrReviewers = 1
let lintResultsPath = '.'
let testResultsPath = '.'
let browserResultsPath = '.'
let disallowedStrings = ['#ISSUEID']
let rootFolder = 'src'

schedule(async () => {
  // Library
  duties.emptyChangelog()
  await duties.versionBump()
  duties.readmeUpdate()

  // Browser, linter, and test results
  duties.hasBrowserErrors(
    await getBrowserResults(browserResultsPath),
    rootFolder
  )
  duties.hasLintErrors(await getLintResults(lintResultsPath), rootFolder)
  duties.hasLintWarnings(await getLintResults(lintResultsPath), rootFolder)
  duties.hasTestErrors(await getTestResults(testResultsPath), rootFolder)

  if (danger.github !== null) {
    // AutoFix
    await duties.autoFix(personalityNetChangeThreshold)

    // PR
    duties.prAssignee()
    duties.netNegativePR()
    duties.bigPr(prNetChangeThreshold)
    duties.noPrDescription()
    duties.requestedReviewers(recommendedPrReviewers)
    duties.disallowedDescription(disallowedStrings)
    duties.gitFlow()
  }
})
