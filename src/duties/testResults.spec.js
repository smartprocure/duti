/* eslint-env jest */

let test = require("./testResults");
let testHelpers = require("../test-data/test-results");

describe("test results", () => {
  it("fails if they have errors", () => {
    let fail = jest.fn();
    let testResults = testHelpers.failing;
    test.hasTestErrors({ testResults, fail });

    expect(fail).toHaveBeenCalled();
  });

  it("doesnt fail if it is passing", () => {
    let fail = jest.fn();
    let testResults = testHelpers.passing;
    test.hasTestErrors({ testResults, fail });

    expect(fail).not.toHaveBeenCalled();
  });
});
