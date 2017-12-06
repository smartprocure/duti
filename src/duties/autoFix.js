let _ = require('lodash/fp')
let { execSync } = require('child_process')

let autoFix = async ({ message, warn }) => {
  try {
    execSync('npm run duti:fix')
  } catch (e) {
    if (_.includes('missing script: duti:fix', e.message))
      message('No `duti:fix` npm script found. Not autofixing this PR.')
    else {
      warn('Could not run `duti:fix` command successfully')
    }
  }
  try {
    execSync(
      'git commit -am "Automagically formatted by Duti!\n\nhttps://github.com/smartprocure/duti" && git push'
    )
    message(
      'We were able to automatically fix some formatting issues in this PR for you!'
    )
  } catch (err) {
    // eslint-disable-next-line
    console.log(
      'Probably failed because it was pushing no changes. Error here:'
    )
    // eslint-disable-next-line
    console.log({ err })
  }
}

module.exports = {
  autoFix,
}
