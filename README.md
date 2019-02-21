# Duti :poop:
D(anger) (Uti)lities

[![npm version](https://badge.fury.io/js/duti.svg)](https://badge.fury.io/js/duti)
![dependencies](https://david-dm.org/smartprocure/duti.svg)
[![CircleCI](https://circleci.com/gh/smartprocure/duti/tree/master.svg?style=svg)](https://circleci.com/gh/smartprocure/duti/tree/master)

## Usage

```javascript
// danger, schedule, etc... are provided as globals by danger
let {
    readmeUpdate,
    versionBump
} = require('duti')({ danger, schedule, fail, warn, markdown, message })

readmeUpdate()
schedule(async () => {
    await versionBump()
})
```
