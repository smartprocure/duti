/* eslint-env jest */

let { detectPrettier } = require('./prettier')

describe('detectPrettier', () => {
  it('warns if code is not prettified', async () => {
    let warn = jest.fn()
    let danger = {
      git: { created_files: ['src/test-data/ugly.js'], modified_files: [] },
    }
    await detectPrettier({ danger, warn })

    expect(warn).toHaveBeenCalled()
  })

  it('doesnt warn if there are no new/modified javascript files', async () => {
    let warn = jest.fn()
    let danger = {
      git: { created_files: ['README.md'], modified_files: [] },
    }
    await detectPrettier({ danger, warn })
    expect(warn).not.toHaveBeenCalled()
  })
})
