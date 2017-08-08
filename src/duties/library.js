let _ = require('lodash/fp')

let emptyChangelog = ({ danger, fail }) => {
  if (!_.includes('CHANGELOG.md', danger.git.modified_files)) {
    fail('The changelog has not been updated. Please update the changelog.')
  }
}

let versionBump = ({ danger, fail }) => {
  if (!_.includes('version', danger.git.diffForFile('version'))) {
    fail('The version was not updated. Please update the version.')
  }
}

let readmeUpdate = ({ danger, fail }) => {
  if (!_.includes('README.md', danger.git.modified_files)) {
    fail('The README has not been updated. Please update the README.')
  }
}

module.exports = {
  emptyChangelog,
  versionBump,
  readmeUpdate,
}
