/* eslint-env jest */

let {
  log,
  getLintResults,
  readFileIfExists,
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
    let result = await readFileIfExists(__filename)
    expect(result).toBeDefined()
  })

  it('returns undefined if file does not exist', async () => {
    let result = await readFileIfExists('/imagainary/path/pls/fail.jpg')
    expect(result).toBe(undefined)
  })
})

describe('getLintResults', () => {
  it('parses results', async () => {
    let result = await getLintResults({
      config: { lintResultsPath: './src/test-data' },
    })
    expect(result).toBeDefined()
  })

  it("shows contents if couldn't parse", async () => {
    expect(async () => {
      await getLintResults({
        config: { lintResultsPath: './src/test-data/bad-path' },
      })
    }).toThrow()
  })
})

describe('getTestResults', () => {
  it('parses results', async () => {
    let result = await getTestResults({
      config: { testResultsPath: './src/test-data' },
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
