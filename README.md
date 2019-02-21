# Duti :poop:
D(anger) (Uti)lities

[![npm version](https://badge.fury.io/js/duti.svg)](https://badge.fury.io/js/duti)
![dependencies](https://david-dm.org/smartprocure/duti.svg)
[![CircleCI](https://circleci.com/gh/smartprocure/duti/tree/master.svg?style=svg)](https://circleci.com/gh/smartprocure/duti/tree/master)

## Usage

```javascript
// danger, schedule, etc... are provided as globals by danger
let duties = require('duti')({ danger, schedule, fail, warn, markdown, message })

// Then use the duties. They will call the appropriate danger fail, warn, and message functions
duties.readmeUpdate()
schedule(async () => {
    await duties.versionBump()
})
```
