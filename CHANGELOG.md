## 0.7.2

- Add browser test result parser (karma).
- Add prettier configuration.

## 0.7.1

- Fix default configuration not loading properly

## 0.7.0

- Add configuration support
- Fix autofixer duti committing non-js files

## 0.6.2

- Fix autofix publishing to unintended branches

## 0.6.1

- Fix lint results erroring if there are none

## 0.6.0

- Add ability to disallow strings in PR descriptions

## 0.5.0

- Fix parsing standard-json eslint outputs
- Add ability to automatically format PRs and push to them

## 0.4.0

- Reduce default configuration of recommended reviewers to 1

## 0.3.5

- Always run duti against itself in CI

## 0.3.4

- Changed internal prettier config to be ES5-compatible

## 0.3.3

- Made readme check warn instead fail

## 0.3.2

- Fix issue with NPM not finding `bin/duti.js`

## 0.3.1

- Fix issue when running `duti` as a binary and it fails spawning the danger process.

## 0.3.0

- Fail on not changing the following:
  - `CHANGELOG.md`
  - `README.md`
  - `package.json`'s `version` property

## 0.2.0

- Add support for mocha JSON output files 

## 0.1.0

Initial Release
