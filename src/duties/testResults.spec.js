/* eslint-env jest */

let test = require('./testResults')
let testHelpers = require('../test-data/test-results')

let danger = {
  github: {
    pr: {
      head: { ref: 'master', repo: { html_url: 'https://test.example' } },
    },
  },
}

describe('test results', () => {
  it('fails if they have errors', () => {
    let fail = jest.fn()
    let testResults = testHelpers.failing
    test.hasTestErrors({ fail, danger })(testResults)

    expect(fail).toHaveBeenCalled()
  })

  it('doesnt fail if it is passing', () => {
    let fail = jest.fn()
    let testResults = testHelpers.passing
    test.hasTestErrors({ fail })(testResults)

    expect(fail).not.toHaveBeenCalled()
  })

  it('has a link', () => {
    let fail = jest.fn()
    let testResults = testHelpers.failing
    test.hasTestErrors({ fail, danger })(testResults)
    let expected = /https:\/\/test.example/.test(fail.mock.calls[0][0])
    expect(expected).toBe(true)
  })
})
