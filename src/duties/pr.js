let _ = require('lodash/fp')
let { log } = require('../utils')

let prAssignee = ({ danger, fail }) => {
  if (!danger.github.pr.assignee) {
    fail(
      'Please assign someone to merge this PR, and optionally include people who should review.'
    )
  }
}

let netNegativePR = ({ danger, message }) => {
  if (danger.github.pr.additions < danger.github.pr.deletions) {
    message('You reduced the total lines of code! Awesome! :+1:')
  }
}

let bigPr = ({ danger, warn, config: { prNetChangeThreshold } }) => {
  if (
    danger.github.pr.additions + danger.github.pr.deletions >=
    prNetChangeThreshold
  ) {
    warn(
      `:exclamation: This PR is BIG (+${danger.github.pr.additions} -${danger
        .github.pr
        .deletions})  \nPlease keep it below ${prNetChangeThreshold} net changes`
    )
  }
}

let noPrDescription = ({ danger, fail }) => {
  if (danger.github.pr.body.length === 0) {
    fail('Please add a description to your PR')
  }
}

let requestedReviewers = ({
  danger,
  warn,
  config: { recommendedPrReviewers },
}) => {
  let reviewerAmt = danger.github.pr.requested_reviewers.length
  if (reviewerAmt < recommendedPrReviewers) {
    let netReviewers = recommendedPrReviewers - reviewerAmt
    let i18n = netReviewers === 1 ? 'reviewer' : 'reviewers'
    warn(`You should add at least ${netReviewers} more ${i18n} to the PR`)
  }
}

let disallowedDescription = ({ danger, fail, config }) => {
  let { github: { pr: { body } } } = danger
  if (_.some(s => _.contains(s, body), config.disallowedStrings)) {
    fail(`The PR description contains a mistake. Here's a list of disallowed phrases/strings:

${_.flow(_.map(s => `- ${s}`), _.join('\n'))(config.disallowedStrings)}
`)
  }
}

module.exports = {
  prAssignee,
  bigPr,
  noPrDescription,
  requestedReviewers,
  netNegativePR,
  disallowedDescription,
}
