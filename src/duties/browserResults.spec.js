/* eslint-env jest */

let browser = require('./browserResults')
let browserHelpers = require('../test-data/browser-results')

describe('browser results', () => {
  it('fails if they have errors', () => {
    let fail = jest.fn()
    let message = jest.fn()
    let browserResults = browserHelpers.failing
    browser.hasBrowserErrors({ fail, message })(browserResults)

    expect(fail).toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
  })

  it('doesnt fail if it is passing', () => {
    let fail = jest.fn()
    let message = jest.fn()
    let browserResults = browserHelpers.passing
    browser.hasBrowserErrors({ fail, message })(browserResults)

    expect(message).toHaveBeenCalled()
    expect(fail).not.toHaveBeenCalled()
  })

  it('doesnt fail but message should be called if data is incorrect', () => {
    let fail = jest.fn()
    let message = jest.fn()
    let browserResults = {}
    browser.hasBrowserErrors({ fail, message })(browserResults)

    expect(message).toHaveBeenCalled()
    expect(fail).not.toHaveBeenCalled()
  })
})
