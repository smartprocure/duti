let _ = require('lodash/fp')

let emptyChangelog = ({ danger, fail }) => {
  if (!_.includes('CHANGELOG.md', danger.git.modified_files)) {
    fail('The changelog has not been updated. Please update the changelog.')
  }
}

let versionBump = async ({ danger, fail }) => {
  let versionChanged = _.includes(
    'version',
    _.get('diff', await danger.git.diffForFile('package.json')),
  )
  if (!versionChanged) {
    fail('The version was not updated. Please update the version.')
  }
}

let readmeUpdate = ({ danger, warn }) => {
  if (!_.includes('README.md', danger.git.modified_files)) {
    warn('The README has not been updated. Please update the README.')
  }
}

module.exports = {
  emptyChangelog,
  versionBump,
  readmeUpdate,
}
