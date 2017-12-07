/* eslint-env jest */

let personality = require('./personality')

describe('personality', () => {
  it('adds a message if a diff threshold has been met', () => {
    let markdown = jest.fn()
    let danger = { github: { pr: { additions: 250, deletions: 250 } } }
    let config = { personalityNetChangeThreshold: 500 }
    personality.diffThreshold({ markdown, danger, config })

    expect(markdown).toHaveBeenCalled()
  })
  it(`doesn't add a message if the threshold has not been met`, () => {
    let markdown = jest.fn()
    let danger = { github: { pr: { additions: 0, deletions: 0 } } }
    let config = { personalityNetChangeThreshold: 500 }
    personality.diffThreshold({ markdown, danger, config })

    expect(markdown).not.toHaveBeenCalled()
  })
})
