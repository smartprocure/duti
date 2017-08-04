/* eslint-env jest */

let lint = require('./lint')
let lintHelpers = require('../test-helpers/lint-results')

describe('lint results', () => {
  it('fails if they have errors', () => {
    let fail = jest.fn()
    let lintResults = lintHelpers.failing
    lint.hasErrors({ lintResults, fail })

    expect(fail).toHaveBeenCalled()
  })

  it('warns if they have warnings', () => {
    let warn = jest.fn()
    let lintResults = lintHelpers.warning
    lint.hasWarnings({ lintResults, warn })

    expect(warn).toHaveBeenCalled()
  })
})
