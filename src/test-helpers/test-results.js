let passing = {
  numFailedTestSuites: 0,
  numFailedTests: 0,
  numPassedTestSuites: 2,
  numPassedTests: 7,
  numPendingTestSuites: 0,
  numPendingTests: 0,
  numRuntimeErrorTestSuites: 0,
  numTotalTestSuites: 2,
  numTotalTests: 7,
  snapshot: {
    added: 0,
    didUpdate: false,
    failure: false,
    filesAdded: 0,
    filesRemoved: 0,
    filesUnmatched: 0,
    filesUpdated: 0,
    matched: 0,
    total: 0,
    unchecked: 0,
    unmatched: 0,
    updated: 0,
  },
  startTime: 1501803756150,
  success: true,
  testResults: [
    {
      assertionResults: [
        {
          failureMessages: [],
          status: 'passed',
          title: 'fails if the description is empty',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are too many additions',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are too many deletions',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are too many additions and deletions',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'fails if there is no assignee',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are not enough reviewers',
        },
      ],
      endTime: 1501803756875,
      message: '',
      name: '/home/sean/code/dutil/src/duties/pr.spec.js',
      startTime: 1501803756531,
      status: 'passed',
      summary: '',
    },
    {
      assertionResults: [
        {
          failureMessages: [],
          status: 'passed',
          title: 'runs the passed function',
        },
      ],
      endTime: 1501803756926,
      message: '',
      name: '/home/sean/code/dutil/src/utils.spec.js',
      startTime: 1501803756895,
      status: 'passed',
      summary: '',
    },
  ],
  wasInterrupted: false,
}

let failing = {
  numFailedTestSuites: 1,
  numFailedTests: 1,
  numPassedTestSuites: 1,
  numPassedTests: 6,
  numPendingTestSuites: 0,
  numPendingTests: 0,
  numRuntimeErrorTestSuites: 0,
  numTotalTestSuites: 2,
  numTotalTests: 7,
  snapshot: {
    added: 0,
    didUpdate: false,
    failure: false,
    filesAdded: 0,
    filesRemoved: 0,
    filesUnmatched: 0,
    filesUpdated: 0,
    matched: 0,
    total: 0,
    unchecked: 0,
    unmatched: 0,
    updated: 0,
  },
  startTime: 1501804154940,
  success: false,
  testResults: [
    {
      assertionResults: [
        {
          failureMessages: [],
          status: 'passed',
          title: 'fails if the description is empty',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are too many additions',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are too many deletions',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are too many additions and deletions',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'fails if there is no assignee',
        },
        {
          failureMessages: [],
          status: 'passed',
          title: 'warns if there are not enough reviewers',
        },
      ],
      endTime: 1501804155537,
      message: '',
      name: '/home/sean/code/dutil/src/duties/pr.spec.js',
      startTime: 1501804155342,
      status: 'passed',
      summary: '',
    },
    {
      assertionResults: [
        {
          failureMessages: [
            'Error: \u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).not.toHaveBeenCalled(\u001b[22m\u001b[2m)\u001b[22m\n\nExpected mock function not to be called but it was called with:\n  \u001b[31m[""]\u001b[39m\n    at Object.it (/home/sean/code/dutil/src/utils.spec.js:10:20)\n    at Object.asyncFn (/home/sean/code/dutil/node_modules/jest-jasmine2/build/jasmine-async.js:68:30)\n    at resolve (/home/sean/code/dutil/node_modules/jest-jasmine2/build/queueRunner.js:38:12)\n    at Promise (<anonymous>)\n    at mapper (/home/sean/code/dutil/node_modules/jest-jasmine2/build/queueRunner.js:31:21)\n    at Promise.resolve.then.el (/home/sean/code/dutil/node_modules/p-map/index.js:42:16)\n    at <anonymous>',
          ],
          status: 'failed',
          title: 'runs the passed function',
        },
      ],
      endTime: 1501804155663,
      message:
        '\u001b[1m\u001b[31m  \u001b[1m● \u001b[1mlog › runs the passed function\u001b[39m\u001b[22m\n\n    \u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).not.toHaveBeenCalled(\u001b[22m\u001b[2m)\u001b[22m\n    \n    Expected mock function not to be called but it was called with:\n      \u001b[31m[""]\u001b[39m\n\u001b[2m      \n      \u001b[2mat Object.it (\u001b[2m\u001b[0m\u001b[36msrc/utils.spec.js\u001b[39m\u001b[0m\u001b[2m:10:20)\u001b[2m\n          at Promise (<anonymous>)\n      \u001b[2mat Promise.resolve.then.el (\u001b[2m\u001b[0m\u001b[36mnode_modules/p-map/index.js\u001b[39m\u001b[0m\u001b[2m:42:16)\u001b[2m\n          at <anonymous>\u001b[22m\n',
      name: '/home/sean/code/dutil/src/utils.spec.js',
      startTime: 1501804155556,
      status: 'failed',
      summary: '',
    },
  ],
  wasInterrupted: false,
}

module.exports = {
  passing,
  failing,
}
