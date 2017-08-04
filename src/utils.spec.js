/* eslint-env jest */

let {
  log,
  getLintResults,
  checkFileExists,
  getTestResults,
  fileToJson,
} = require('./utils')

describe('log', () => {
  it('runs the passed function', () => {
    let fn = jest.fn()
    log(fn)('')

    expect(fn).toHaveBeenCalled()
  })
})

describe('checkFileExists', () => {
  it('finds files that exist', async () => {
    let result = await checkFileExists(__filename)
    expect(result).toBeDefined()
  })

  it('returns undefined if file does not exist', async () => {
    let result = await checkFileExists('/imagainary/path/pls/fail.jpg')
    expect(result).toBe(undefined)
  })
})

describe('getLintResults', () => {
  it('parses results', async () => {
    let result = await getLintResults({
      config: { lintResultsPath: './src/test-helpers' },
    })
    expect(result).toBeDefined()
  })
})

describe('getTestResults', () => {
  it('parses results', async () => {
    let result = await getTestResults({
      config: { testResultsPath: './src/test-helpers' },
    })
    expect(result).toBeDefined()
  })
})

describe('fileToJson', () => {
  it('parses JSON if not undefined', () => {
    expect(fileToJson('{}')).toEqual({})
  })

  it('returns undefined if undefined', () => {
    expect(fileToJson(undefined)).toBe(undefined)
  })
})
