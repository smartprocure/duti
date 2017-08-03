/* eslint-disable no-console */

let log = fn => str =>
  (process.env.NODE_ENV !== 'test' &&
    console.log(`[${`${fn.name}`.toUpperCase()}] ${str}`)) ||
  fn(str)

module.exports = {
  log,
}
