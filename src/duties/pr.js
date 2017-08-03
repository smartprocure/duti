let { log } = require('../utils')

let prAssignee = ({ danger, fail }) => {
  if (!danger.github.pr.assignee) {
    log(fail)(
      'Please assign someone to merge this PR, and optionally include people who should review.',
    )
  }
}

let bigPr = ({ danger, warn }) => {
  let threshold = 500
  if (danger.github.pr.additions + danger.github.pr.deletions >= threshold) {
    log(warn)(
      `:exclamation: This PR is BIG (+${danger.github.pr.additions} -${danger
        .github.pr
        .deletions})  \nPlease keep it below ${threshold} net changes`,
    )
  }
}

let noPrDescription = ({ danger, fail }) => {
  if (danger.github.pr.body.length === 0) {
    log(fail)('Please add a description to your PR')
  }
}

let requestedReviewers = async ({ danger, warn }) => {
  let reviewersRecommended = 2
  if (danger.github.pr.requested_reviewers.length < reviewersRecommended) {
    let reviewerAmt = danger.github.pr.requested_reviewers.length
    let netReviewers = reviewersRecommended - reviewerAmt
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
