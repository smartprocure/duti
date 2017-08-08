/* eslint-env jest */
let { emptyChangelog, versionBump, readmeUpdate } = require('./library')
let _ = require('lodash/fp')

describe('emptyChangelog', () => {
  it('fails if the changelog has not been updated', () => {
    let fail = jest.fn()
    let danger = { git: { modified_files: [] } }
    emptyChangelog({ danger, fail })
    expect(fail).toHaveBeenCalled()
  })

  it('doesnt fail if the changelog has been updated', () => {
    let fail = jest.fn()
    let danger = { git: { modified_files: ['CHANGELOG.md'] } }
    emptyChangelog({ danger, fail })
    expect(fail).not.toHaveBeenCalled()
  })
})

describe('versionBump', () => {
  it('fails if the version was not bumped', () => {
    let fail = jest.fn()
    let diffForFile = jest.fn(() => [''])
    let danger = { git: { diffForFile } }
    versionBump({ danger, fail })
    expect(fail).toHaveBeenCalled()
  })

  it('doesnt fails if the version was not bumped', () => {
    let fail = jest.fn()
    let diffForFile = jest.fn(() => ['version'])
    let danger = { git: { diffForFile } }
    versionBump({ danger, fail })
    expect(fail).not.toHaveBeenCalled()
  })
})

describe('readmeUpdate', () => {
  it('fails if the readme has not been updated', () => {
    let fail = jest.fn()
    let danger = { git: { modified_files: [] } }
    readmeUpdate({ danger, fail })
    expect(fail).toHaveBeenCalled()
  })

  it('doesnt fail if the readme has been updated', () => {
    let fail = jest.fn()
    let danger = { git: { modified_files: ['README.md'] } }
    readmeUpdate({ danger, fail })
    expect(fail).not.toHaveBeenCalled()
  })
})