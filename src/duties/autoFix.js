let _ = require('lodash/fp')
let Git = require('nodegit')
let path = require('path')
let { execSync } = require('child_process')
let { Repository } = Git
let { getRunningDirectory } = require('../utils')

let autoFix = async ({ message, config }) => {
  try {
    execSync('npm run duti:fix')
    let repoDir = `${await getRunningDirectory()}/.git`
    let Repo = await Repository.open(repoDir)
    let statuses = await Repo.getStatus()

    let modifiedFiles = statuses.filter(file => {
      let filePath = file.path()
      let isJsFile = config.autoFix.extensions.some(
        ext => ext === path.extname(filePath)
      )
      return !!file.isModified() && isJsFile
    })
    if (modifiedFiles.length) {
      _.each(file => {
        execSync(`git add ${file.path()}`)
      }, modifiedFiles)
      execSync(
        'git commit -m "Automagically formatted by Duti!\n\nhttps://github.com/smartprocure/duti" && git push'
      )
      message(
        'We were able to automatically fix some formatting issues in this PR for you!'
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
