let { execSync } = require('child_process')

let autoFix = async ({ message }) => {
  try {
    execSync('npm run duti:fix')
    execSync(
      'git commit -am "Automagically formatted by Duti!\n\nhttps://github.com/smartprocure/duti" && git push'
    )
    message(
      'We were able to automatically fix some formatting issues in this PR for you!'
    )
  } catch (e) {
    message('No `duti:fix` npm script found. Not autofixing this PR.')
  }
}

module.exports = {
  autoFix,
}
