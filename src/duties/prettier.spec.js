/* eslint-env jest */

let { detectPrettier } = require('./prettier')

describe('detectPrettier', () => {
  it('warns if code is not prettified', async () => {
    let fail = jest.fn()
    let danger = {
      git: { created_files: ['src/test-data/ugly.js'], modified_files: [] },
    }
    await detectPrettier({ danger, fail })

    expect(fail).toHaveBeenCalled()
  })
})
