/* eslint-env jest */

let lint = require('./lint')
let lintHelpers = require('../test-data/lint-results')

let danger = {
  github: {
    pr: {
      head: { ref: 'master', repo: { html_url: 'https://test.example' } },
    },
  },
}

describe('lint results', () => {
  it('allows lint results to be undefined', () => {
    let fail = jest.fn()
    let warn = jest.fn()
    let message = jest.fn()
    let lintResults = undefined
    lint.hasLintErrors({ lintResults, fail, message, danger })
    lint.hasLintWarnings({ lintResults, warn, message, danger })

    expect(fail).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
    expect(message).toHaveBeenCalled()
  })

  it('fails if they have errors', () => {
    let fail = jest.fn()
    let lintResults = lintHelpers.failing
    lint.hasLintErrors({ lintResults, fail, danger })

    expect(fail).toHaveBeenCalled()
  })

  it('warns if they have warnings', () => {
    let warn = jest.fn()
    let lintResults = lintHelpers.warning
    lint.hasLintWarnings({ lintResults, warn, danger })

    expect(warn).toHaveBeenCalled()
  })

  it('neither fails or warns if successful', () => {
    let warn = jest.fn()
    let fail = jest.fn()
    let lintResults = lintHelpers.passing
    lint.hasLintWarnings({ lintResults, warn, danger })
    lint.hasLintErrors({ lintResults, fail, danger })

    expect(warn).not.toHaveBeenCalled()
    expect(fail).not.toHaveBeenCalled()
  })

  describe('Standard JSON', () => {
    it('passes if there arent any messages', () => {
      let fail = jest.fn()
      let lintResults = lintHelpers.standardJsonPassing
      lint.hasLintErrors({ lintResults, fail, danger })

      expect(fail).not.toHaveBeenCalled()
    })

    it('fails if there are any messages', () => {
      let fail = jest.fn()
      let lintResults = lintHelpers.standardJsonFailing
      lint.hasLintErrors({ lintResults, fail, danger })

      expect(fail).toHaveBeenCalled()
    })
  })

  it('adds related links to lint results with warnings', () => {
    let warn = jest.fn()
    let lintResults = lintHelpers.warning

    lint.hasLintWarnings({ lintResults, warn, danger })
    let expected = /https:\/\/test.example\/blob\/master/.test(
      warn.mock.calls[0][0]
    )

    expect(expected).toBe(true)
  })

  it('adds related links to lint results with errors', () => {
    let fail = jest.fn()
    let lintResults = lintHelpers.failing

    lint.hasLintErrors({ lintResults, fail, danger })
    let expected = /https:\/\/test.example\/blob\/master/.test(
      fail.mock.calls[0][0]
    )

    expect(expected).toBe(true)
  })
})
