let _ = require('lodash/fp')

let diffThreshold = ({ markdown, danger }) => {
  let diffTotal =
    (_.get('github.pr.additions', danger) || 0) +
    (_.get('github.pr.deletions', danger) || 0)
  if (diffTotal >= 500)
    markdown(
      `![kill all humans](https://media.licdn.com/mpr/mpr/shrinknp_800_800/p/2/005/0b3/059/36a09a3.jpg)`
    )
}

module.exports = {
  diffThreshold,
}
