/* eslint-env jest */

let {
  log,
  getLintResults,
  readFileIfExists,
  getTestResults,
  fileToJson,
  linkifyPath,
  pathTail,
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

describe('linkifyPath', () => {
  it('Creates an html link', () => {
    let danger = {
      github: {
        pr: {
          head: { ref: 'master', repo: { html_url: 'https://test.example' } },
        },
      },
    }
    let path = 'src/app.js'
    expect(linkifyPath({ danger, path })).toBe(
      '<a href="https://test.example/blob/master/src/app.js" target="_blank">src/app.js</a>'
    )
  })
})

describe('pathTail', () => {
  it('removes the all folders until defined folder is found', () => {
    let path = '/no/bob/yes/yes/file.ext'
    let config = {
      rootFolder: 'yes',
    }
    expect(pathTail(path, config)).toBe('yes/yes/file.ext')
  })
})
