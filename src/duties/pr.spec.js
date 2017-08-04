/* eslint-env jest */

let pr = require('./pr')
let config = require('../config')

describe('Pull Request', () => {
  it('fails if the description is empty', () => {
    let danger = { github: { pr: { body: '' } } }
    let fail = jest.fn()
    pr.noPrDescription({ danger, fail })
    expect(fail).toHaveBeenCalled()
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

  it('fails if there is no assignee', () => {
    let danger = { github: { pr: {} } }
    let fail = jest.fn()
    pr.prAssignee({ danger, fail })
    expect(fail).toHaveBeenCalled()
  })

  it('warns if there are not enough reviewers', () => {
    let danger = { github: { pr: { requested_reviewers: [] } } }
    let warn = jest.fn()
    pr.requestedReviewers({ danger, warn, config })
    expect(warn).toHaveBeenCalled()
  })
})
