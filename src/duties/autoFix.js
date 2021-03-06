let _ = require('lodash/fp')
let { execSync, exec } = require('child_process')
let Promise = require('bluebird')

let execP = Promise.promisify(exec, { multiArgs: true })

let autoFix = async ({ message, warn, markdown, config }) => {
  try {
    execSync('npm run duti:fix')
    let out = _.head(await execP('git diff --shortstat'))
    let reg = /(\d+) insertions?[\D]*(\d+) deletions?/g
    let vals = reg.exec(out)
    if (vals && vals.length === 3) {
      let additions = Number.parseInt(vals[1])
      let deletions = Number.parseInt(vals[2])
      if (additions + deletions >= config.personalityNetChangeThreshold) {
        markdown(
          '![kill all humans](https://media.licdn.com/mpr/mpr/shrinknp_800_800/p/2/005/0b3/059/36a09a3.jpg)'
        )
      }
    }
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
    let commitHash = _.head(await execP('git rev-parse HEAD'))
    message(
      'We were able to automatically fix some formatting issues in this PR for you!'
    )
    markdown(`
### Some things that were possibly fixed:

- Code that could be fixed via the --fix flag
- Formatting that could be fixed by prettier

Take a look at this commit to see what happened in detail: ${commitHash}

And look at this wiki page to see the reasoning behind the ESLint rules: https://github.com/smartprocure/eslint-config-smartprocure/wiki/Rules-and-Why-We-Chose-Them`)
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
