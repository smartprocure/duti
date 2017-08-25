let _ = require("lodash/fp");
let { basename } = require("path");
let { log } = require("../utils");

let messageTemplate = message => `
  <strong>${message.message}</strong>
  <code>Line ${message.line}: ${message.source.trim()}</code>`;

let formatLintMessages = _.flow(_.map(messageTemplate), _.join("\n"));

let lintTemplate = severity => lint => `
<details>
  <summary>${basename(lint.filePath)}</summary>
  <p>Full Path: <code>${lint.filePath}</code></p>
  ${formatLintMessages(_.filter({ severity }, lint.messages))}
</details>`;

let formatLint = severity =>
  _.flow(
    _.filter(lint => _.some({ severity }, lint.messages)),
    _.map(lintTemplate(severity)),
    _.join("")
  );

let hasLintErrors = ({ lintResults, fail }) => {
  if (_.sumBy("errorCount", lintResults) > 0) {
    fail(`Your PR has lint errors. Please fix these and commit them.
      ${formatLint(2)(lintResults)}`);
  }
};

let hasLintWarnings = ({ lintResults, warn }) => {
  if (_.sumBy("warningCount", lintResults) > 0) {
    warn(
      `Your PR has lint warnings. Please consider fixing these.
      ${formatLint(1)(lintResults)}`
    );
  }
};

module.exports = {
  hasLintErrors,
  hasLintWarnings
};
