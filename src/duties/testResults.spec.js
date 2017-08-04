/* eslint-env jest */

let test = require('./testResults')
let testHelpers = require('../test-helpers/test-results')

describe('test results', () => {
  it('fails if they have errors', () => {
    let fail = jest.fn()
    let testResults = testHelpers.failing
    test.hasErrors({ testResults, fail })

    expect(fail).toHaveBeenCalled()
  })

  it('doesnt fail if it is passing', () => {
    let fail = jest.fn()
    let testResults = testHelpers.passing
    test.hasErrors({ testResults, fail })

    expect(fail).not.toHaveBeenCalled()
  })
})
