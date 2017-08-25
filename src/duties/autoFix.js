let _ = require('lodash/fp')
let Git = require('nodegit')
let { execSync } = require('child_process')
let { Repository } = Git
let { getRunningDirectory } = require('../utils')

let autoFix = async ({ message }) => {
  try {
    execSync('npm run duti:fix')
    let repoDir = `${await getRunningDirectory()}/.git`
    let Repo = await Repository.open(repoDir)
    let statuses = await Repo.getStatus()

    let modifiedFiles = statuses.map(file => !!file.isModified())
    let hasModifiedFiles = _.contains(true, modifiedFiles)

    if (hasModifiedFiles) {
      execSync(
        'git commit -am "Automagically formatted by Duti!\n\nhttps://github.com/smartprocure/duti" && git push --force',
      )
      message(
        'We were able to automatically fix some formatting issues in this PR for you!',
      )
    } else {
      message('Awesome! Thanks for the well-formatted PR!')
    }
  } catch (e) {
    message('No `duti:fix` npm script found. Not autofixing this PR.')
  }
}

module.exports = {
  autoFix,
}
