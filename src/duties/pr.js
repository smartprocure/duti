let { log } = require('../utils')

let prAssignee = ({ danger, fail }) => {
  if (!danger.github.pr.assignee) {
    log(fail)(
      'Please assign someone to merge this PR, and optionally include people who should review.',
    )
  }
}

let bigPr = ({ danger, warn, config: { prNetChangeThreshold } }) => {
  if (
    danger.github.pr.additions + danger.github.pr.deletions >=
    prNetChangeThreshold
  ) {
    log(warn)(
      `:exclamation: This PR is BIG (+${danger.github.pr.additions} -${danger
        .github.pr
        .deletions})  \nPlease keep it below ${prNetChangeThreshold} net changes`,
    )
  }
}

let noPrDescription = ({ danger, fail }) => {
  if (danger.github.pr.body.length === 0) {
    log(fail)('Please add a description to your PR')
  }
}

let requestedReviewers = async ({
  danger,
  warn,
  config: { recommendedPrReviewers },
}) => {
  if (danger.github.pr.requested_reviewers.length < recommendedPrReviewers) {
    let reviewerAmt = danger.github.pr.requested_reviewers.length
    let netReviewers = recommendedPrReviewers - reviewerAmt
    let i18n = netReviewers === 1 ? 'reviewer' : 'reviewers'
    log(warn)(`You should add at least ${netReviewers} more ${i18n} to the PR`)
  }
}

module.exports = {
  prAssignee,
  bigPr,
  noPrDescription,
  requestedReviewers,
}