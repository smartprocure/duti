#!/usr/bin/env node
/* eslint-disable no-console */

let { spawn } = require('child_process')
let path = require('path')
let duti = spawn(path.resolve(__dirname, '../node_modules/.bin/danger'), [
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

duti.on('close', code => {
  console.log(`Duti exited with code: ${code}`)
})
