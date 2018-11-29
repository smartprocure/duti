## 0.14.2
* Bump dependencies to fix Circle issue

## 0.14.1
* Bump dependencies to stop security warnings

## 0.14.0

* Fixed DangerJS to v2.0.1

## 0.13.0

* Add explanation to auto-fix

## 0.12.0

* Add links to ESLint and Jest results
* Add config for determining projectRoot

## 0.11.2

* Add ESLint to the project

## 0.11.1

* Use real diffs for personality

## 0.11.0

* Add Git Flow Warnings

## 0.10.0

* Add some personality

## 0.9.5

* Show proper error messages for failed autofix depending on reason

## 0.9.4

* Fix bug where adding a `CHANGELOG.md` file fails changelog checking

## 0.9.3

* Remove Node 8 restriction

## 0.9.2

* Updated [Danger.js](http://danger.systems/js/) version

## 0.9.1

* If parsing JSON fails, throw with the correct stack instead of a generic
  syntax error

## 0.9.0

* Removen node-git depdency
* Commit all modified files on an autofix instead of specific file types

## 0.8.0

* Add browser test result parser (karma).
* Add prettier configuration.

## 0.7.1

* Fix default configuration not loading properly

## 0.7.0

* Add configuration support
* Fix autofixer duti committing non-js files

## 0.6.2

* Fix autofix publishing to unintended branches

## 0.6.1

* Fix lint results erroring if there are none

## 0.6.0

* Add ability to disallow strings in PR descriptions

## 0.5.0

* Fix parsing standard-json eslint outputs
* Add ability to automatically format PRs and push to them

## 0.4.0

* Reduce default configuration of recommended reviewers to 1

## 0.3.5

* Always run duti against itself in CI

## 0.3.4

* Changed internal prettier config to be ES5-compatible

## 0.3.3

* Made readme check warn instead fail

## 0.3.2

* Fix issue with NPM not finding `bin/duti.js`

## 0.3.1

* Fix issue when running `duti` as a binary and it fails spawning the danger
  process.

## 0.3.0

* Fail on not changing the following:
  * `CHANGELOG.md`
  * `README.md`
  * `package.json`'s `version` property

## 0.2.0

* Add support for mocha JSON output files

## 0.1.0

Initial Release
