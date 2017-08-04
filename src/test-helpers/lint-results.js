let passing = [
  {
    filePath: '/home/sean/code/dutil/src/duties/lint.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/duties/pr.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/duties/pr.spec.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
]

let failing = [
  {
    filePath: '/home/sean/code/dutil/src/duties/lint.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/duties/pr.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/duties/pr.spec.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/test-helpers/lint-results.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/test-helpers/test-results.js',
    messages: [
      {
        ruleId: 'no-unused-vars',
        severity: 2,
        message: "'bob' is assigned a value but never used.",
        line: 176,
        column: 5,
        nodeType: 'Identifier',
        source: 'let bob = {}',
      },
    ],
    errorCount: 1,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    source:
      "let passing = {\n  numFailedTestSuites: 0,\n  numFailedTests: 0,\n  numPassedTestSuites: 2,\n  numPassedTests: 7,\n  numPendingTestSuites: 0,\n  numPendingTests: 0,\n  numRuntimeErrorTestSuites: 0,\n  numTotalTestSuites: 2,\n  numTotalTests: 7,\n  snapshot: {\n    added: 0,\n    didUpdate: false,\n    failure: false,\n    filesAdded: 0,\n    filesRemoved: 0,\n    filesUnmatched: 0,\n    filesUpdated: 0,\n    matched: 0,\n    total: 0,\n    unchecked: 0,\n    unmatched: 0,\n    updated: 0,\n  },\n  startTime: 1501803756150,\n  success: true,\n  testResults: [\n    {\n      assertionResults: [\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'fails if the description is empty',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are too many additions',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are too many deletions',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are too many additions and deletions',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'fails if there is no assignee',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are not enough reviewers',\n        },\n      ],\n      endTime: 1501803756875,\n      message: '',\n      name: '/home/sean/code/dutil/src/duties/pr.spec.js',\n      startTime: 1501803756531,\n      status: 'passed',\n      summary: '',\n    },\n    {\n      assertionResults: [\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'runs the passed function',\n        },\n      ],\n      endTime: 1501803756926,\n      message: '',\n      name: '/home/sean/code/dutil/src/utils.spec.js',\n      startTime: 1501803756895,\n      status: 'passed',\n      summary: '',\n    },\n  ],\n  wasInterrupted: false,\n}\n\nlet failing = {\n  numFailedTestSuites: 1,\n  numFailedTests: 1,\n  numPassedTestSuites: 1,\n  numPassedTests: 6,\n  numPendingTestSuites: 0,\n  numPendingTests: 0,\n  numRuntimeErrorTestSuites: 0,\n  numTotalTestSuites: 2,\n  numTotalTests: 7,\n  snapshot: {\n    added: 0,\n    didUpdate: false,\n    failure: false,\n    filesAdded: 0,\n    filesRemoved: 0,\n    filesUnmatched: 0,\n    filesUpdated: 0,\n    matched: 0,\n    total: 0,\n    unchecked: 0,\n    unmatched: 0,\n    updated: 0,\n  },\n  startTime: 1501804154940,\n  success: false,\n  testResults: [\n    {\n      assertionResults: [\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'fails if the description is empty',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are too many additions',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are too many deletions',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are too many additions and deletions',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'fails if there is no assignee',\n        },\n        {\n          failureMessages: [],\n          status: 'passed',\n          title: 'warns if there are not enough reviewers',\n        },\n      ],\n      endTime: 1501804155537,\n      message: '',\n      name: '/home/sean/code/dutil/src/duties/pr.spec.js',\n      startTime: 1501804155342,\n      status: 'passed',\n      summary: '',\n    },\n    {\n      assertionResults: [\n        {\n          failureMessages: [\n            'Error: \\u001b[2mexpect(\\u001b[22m\\u001b[31mjest.fn()\\u001b[39m\\u001b[2m).not.toHaveBeenCalled(\\u001b[22m\\u001b[2m)\\u001b[22m\\n\\nExpected mock function not to be called but it was called with:\\n  \\u001b[31m[\"\"]\\u001b[39m\\n    at Object.it (/home/sean/code/dutil/src/utils.spec.js:10:20)\\n    at Object.asyncFn (/home/sean/code/dutil/node_modules/jest-jasmine2/build/jasmine-async.js:68:30)\\n    at resolve (/home/sean/code/dutil/node_modules/jest-jasmine2/build/queueRunner.js:38:12)\\n    at Promise (<anonymous>)\\n    at mapper (/home/sean/code/dutil/node_modules/jest-jasmine2/build/queueRunner.js:31:21)\\n    at Promise.resolve.then.el (/home/sean/code/dutil/node_modules/p-map/index.js:42:16)\\n    at <anonymous>',\n          ],\n          status: 'failed',\n          title: 'runs the passed function',\n        },\n      ],\n      endTime: 1501804155663,\n      message:\n        '\\u001b[1m\\u001b[31m  \\u001b[1m● \\u001b[1mlog › runs the passed function\\u001b[39m\\u001b[22m\\n\\n    \\u001b[2mexpect(\\u001b[22m\\u001b[31mjest.fn()\\u001b[39m\\u001b[2m).not.toHaveBeenCalled(\\u001b[22m\\u001b[2m)\\u001b[22m\\n    \\n    Expected mock function not to be called but it was called with:\\n      \\u001b[31m[\"\"]\\u001b[39m\\n\\u001b[2m      \\n      \\u001b[2mat Object.it (\\u001b[2m\\u001b[0m\\u001b[36msrc/utils.spec.js\\u001b[39m\\u001b[0m\\u001b[2m:10:20)\\u001b[2m\\n          at Promise (<anonymous>)\\n      \\u001b[2mat Promise.resolve.then.el (\\u001b[2m\\u001b[0m\\u001b[36mnode_modules/p-map/index.js\\u001b[39m\\u001b[0m\\u001b[2m:42:16)\\u001b[2m\\n          at <anonymous>\\u001b[22m\\n',\n      name: '/home/sean/code/dutil/src/utils.spec.js',\n      startTime: 1501804155556,\n      status: 'failed',\n      summary: '',\n    },\n  ],\n  wasInterrupted: false,\n}\n\nlet bob = {}\n\nmodule.exports = {\n  passing,\n  failing,\n}\n",
  },
]

let warning = [
  {
    filePath: '/home/sean/code/dutil/src/duties/lint.js',
    messages: [
      {
        ruleId: 'no-plusplus',
        severity: 1,
        message: "Unary operator '++' used.",
        line: 2,
        column: 33,
        nodeType: 'UpdateExpression',
        source: '  if (lintResults.reduce(acc => acc++, 0) > 0) {',
      },
    ],
    errorCount: 0,
    warningCount: 1,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    source:
      "let hasNoErrors = ({ lintResults, fail }) => {\n  if (lintResults.reduce(acc => acc++, 0) > 0) {\n    fail('Lint failed!')\n  }\n}\n\nmodule.exports = {\n  hasNoErrors,\n}\n",
  },
  {
    filePath: '/home/sean/code/dutil/src/duties/lint.spec.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/duties/pr.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/duties/pr.spec.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/test-helpers/lint-results.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
  {
    filePath: '/home/sean/code/dutil/src/test-helpers/test-results.js',
    messages: [],
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  },
]

module.exports = {
  passing,
  failing,
  warning,
}
