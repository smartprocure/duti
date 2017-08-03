#!/usr/bin/env node

let { spawn } = require('child_process')
let path = require('path')
let ls = spawn('danger', [
  'run',
  '--dangerfile',
  path.resolve(__dirname, '../src/dangerfile.js'),
])

ls.stdout.on('data', data => {
  console.log(`${data}`)
})

ls.stderr.on('data', data => {
  console.log(`${data}`)
})
