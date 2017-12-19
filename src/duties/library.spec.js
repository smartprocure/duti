/* eslint-env jest */
let { emptyChangelog, versionBump, readmeUpdate } = require('./library');

describe('emptyChangelog', () => {
  it('fails if the changelog has not been updated', () => {
    let fail = jest.fn();
    let danger = { git: { modified_files: [] } };
    emptyChangelog({ danger, fail });
    expect(fail).toHaveBeenCalled();
  });

  it('doesnt fail if the changelog has been updated', () => {
    let fail = jest.fn();
    let danger = { git: { modified_files: ['CHANGELOG.md'] } };
    emptyChangelog({ danger, fail });
    expect(fail).not.toHaveBeenCalled();
  });

  it('doesnt fail if there was an added changelog file', () => {
    let fail = jest.fn();
    let danger = { git: { added_files: ['CHANGELOG.md'] } };
    emptyChangelog({ danger, fail });
    expect(fail).not.toHaveBeenCalled();
  });
});

describe('versionBump', () => {
  it('fails if the version was not bumped', async () => {
    let fail = jest.fn();
    let diffForFile = jest.fn(async () => ({
      diff: '',
    }));
    let danger = { git: { diffForFile } };
    await versionBump({ danger, fail });
    expect(fail).toHaveBeenCalled();
  });

  it('doesnt fails if the version was bumped', async () => {
    let fail = jest.fn();
    let diffForFile = jest.fn(async () => ({
      diff: '{"version": "1.0.0"}',
    }));
    let danger = { git: { diffForFile } };
    await versionBump({ danger, fail });
    expect(fail).not.toHaveBeenCalled();
  });
});

describe('readmeUpdate', () => {
  it('fails if the readme has not been updated', () => {
    let warn = jest.fn();
    let danger = { git: { modified_files: [] } };
    readmeUpdate({ danger, warn });
    expect(warn).toHaveBeenCalled();
  });

  it('doesnt fail if the readme has been updated', () => {
    let warn = jest.fn();
    let danger = { git: { modified_files: ['README.md'] } };
    readmeUpdate({ danger, warn });
    expect(warn).not.toHaveBeenCalled();
  });
});
