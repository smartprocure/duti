/* eslint-env jest */

let { log } = require('./utils')

describe('log', () => {
  it('runs the passed function', () => {
    let fn = jest.fn()
    log(fn)('')

    expect(fn).toHaveBeenCalled()
  })
})
