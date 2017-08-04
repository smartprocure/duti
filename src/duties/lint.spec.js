/* eslint-env jest */

let lint = require('./lint')
let lintHelpers = require('../test-helpers/lint-results')

describe('lint results', () => {
  it('fails if they have errors', () => {
    let fail = jest.fn()
    let lintResults = lintHelpers.failing
    lint.hasLintErrors({ lintResults, fail })

    expect(fail).toHaveBeenCalled()
  })

  it('warns if they have warnings', () => {
    let warn = jest.fn()
    let lintResults = lintHelpers.warning
    lint.hasLintWarnings({ lintResults, warn })

    expect(warn).toHaveBeenCalled()
  })

  it('neither fails or warns if successful', () => {
    let warn = jest.fn()
    let fail = jest.fn()
    let lintResults = lintHelpers.passing
    lint.hasLintWarnings({ lintResults, warn })
    lint.hasLintErrors({ lintResults, fail })

    expect(warn).not.toHaveBeenCalled()
    expect(fail).not.toHaveBeenCalled()
  })
})
