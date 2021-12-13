/* eslint-env jest */

let pr = require('./pr')
let config = require('../../.dutirc.json')

describe('Pull Request', () => {
  it('fails if the description is empty', () => {
    let danger = { github: { pr: { body: '' } } }
    let fail = jest.fn()
    pr.noPrDescription({ danger, fail })
    expect(fail).toHaveBeenCalled()
  })

  it('fails if the description is null', () => {
    let danger = { github: { pr: { body: null } } }
    let fail = jest.fn()
    pr.noPrDescription({ danger, fail })
    expect(fail).toHaveBeenCalled()
  })

  it('passes if there is a description', () => {
    let danger = { github: { pr: { body: 'I\'m a description!' } } }
    let fail = jest.fn()
    pr.noPrDescription({ danger, fail })
    expect(fail).not.toHaveBeenCalled()
  })

  it('warns if there are too many additions', () => {
    let danger = { github: { pr: { additions: 500, deletions: 0 } } }
    let warn = jest.fn()
    pr.bigPr({ danger, warn, config })
    expect(warn).toHaveBeenCalled()
  })

  it('warns if there are too many deletions', () => {
    let danger = { github: { pr: { additions: 0, deletions: 500 } } }
    let warn = jest.fn()
    pr.bigPr({ danger, warn, config })
    expect(warn).toHaveBeenCalled()
  })

  it('warns if there are too many additions and deletions', () => {
    let danger = { github: { pr: { additions: 250, deletions: 250 } } }
    let warn = jest.fn()
    pr.bigPr({ danger, warn, config })
    expect(warn).toHaveBeenCalled()
  })

  it('passes if there arent too many additions or deletions', () => {
    let danger = { github: { pr: { additions: 1, deletions: 1 } } }
    let warn = jest.fn()
    pr.bigPr({ danger, warn, config })
    expect(warn).not.toHaveBeenCalled()
  })

  it('fails if there is no assignee', () => {
    let danger = { github: { pr: {} } }
    let fail = jest.fn()
    pr.prAssignee({ danger, fail })
    expect(fail).toHaveBeenCalled()
  })

  it('passes if there is an assignee', () => {
    let danger = { github: { pr: { assignee: { name: 'Sean' } } } }
    let fail = jest.fn()
    pr.prAssignee({ danger, fail })
    expect(fail).not.toHaveBeenCalled()
  })

  it('warns if there are not enough reviewers', () => {
    let danger = { github: { pr: { requested_reviewers: [] } } }
    let warn = jest.fn()
    pr.requestedReviewers({ danger, warn, config })
    expect(warn).toHaveBeenCalled()
  })

  it('passes if there are enough reviewers', () => {
    let danger = {
      github: {
        pr: { requested_reviewers: [{ name: 'Sean' }, { name: 'Garry' }] },
      },
    }
    let warn = jest.fn()
    pr.requestedReviewers({ danger, warn, config })
    expect(warn).not.toHaveBeenCalled()
  })

  it('says nice things if the PR is net negative in LOC', () => {
    let danger = { github: { pr: { additions: 0, deletions: 1 } } }
    let message = jest.fn()
    pr.netNegativePR({ danger, message })
    expect(message).toHaveBeenCalled()
  })

  it('doesnt says nice things if the PR is net positive in LOC :(', () => {
    let danger = { github: { pr: { additions: 1, deletions: 0 } } }
    let message = jest.fn()
    pr.netNegativePR({ danger, message })
    expect(message).not.toHaveBeenCalled()
  })

  it('fails the PR if an unallowed string is present in the issue description', () => {
    let danger = { github: { pr: { body: 'Fixes #ISSUEID' } } }
    let fail = jest.fn()
    pr.disallowedDescription({ danger, fail, config })
    expect(fail).toHaveBeenCalled()
  })

  it('Warns if the PR\'s branch doesn\'t follow git-flow', () => {
    let danger = { github: { pr: { base: { ref: 'non-gitflow-branch' } } } }
    let warn = jest.fn()
    pr.gitFlow({ danger, warn })
    expect(warn).toHaveBeenCalled()
  })

  it('Doesn\'t warn if the PR\'s branch follows git-flow', () => {
    let danger = { github: { pr: { head: { ref: 'feature/GitFlowBranch' } } } }
    let warn = jest.fn()
    pr.gitFlow({ danger, warn })
    expect(warn).not.toHaveBeenCalled()
  })
})
