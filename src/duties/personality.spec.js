/* eslint-env jest */

let personality = require('./personality')

describe('personality', () => {
  it('adds a message if a diff threshold has been met', () => {
    let markdown = jest.fn()
    let danger = { github: { pr: { additions: 250, deletions: 250 } } }
    personality.diffThreshold({ markdown, danger })

    expect(markdown).toHaveBeenCalled()
  })
  it(`doesn't add a message if the threshold has not been met`, () => {
    let markdown = jest.fn()
    let danger = { github: { pr: { additions: 0, deletions: 0 } } }
    personality.diffThreshold({ markdown, danger })

    expect(markdown).not.toHaveBeenCalled()
  })
})
