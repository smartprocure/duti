/* eslint-env jest */

let { detectPrettier } = require('./prettier')

describe('detectPrettier', () => {
  it('warns if code is not prettified', () => {
    let fail = jest.fn()
    let sourceCode = `let bob = {thing:     ["1", '2']};`
    let prettierCode = "let bob = {thing: ['1', '2']}\n"
    let danger = {}
    detectPrettier({ danger, fail })

    expect(fail).toHaveBeenCalled()
  })
})
