#!/usr/bin/env node
/* eslint-disable no-console */

let { spawn } = require('child_process')
let path = require('path')
let duti = spawn('danger', [
  'run',
  '--dangerfile',
  path.resolve(__dirname, '../src/dangerfile.js'),
])

duti.stdout.on('data', data => {
  console.log(`${data}`)
})

duti.stderr.on('data', data => {
  console.log(`${data}`)
})
