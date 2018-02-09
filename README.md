[![view on npm](http://img.shields.io/npm/v/cron-to-quartz.svg)](https://www.npmjs.org/package/cron-to-quartz)
[![view on npm](http://img.shields.io/npm/l/cron-to-quartz.svg)](https://www.npmjs.org/package/cron-to-quartz)
[![npm module downloads](http://img.shields.io/npm/dt/cron-to-quartz.svg)](https://www.npmjs.org/package/cron-to-quartz)
[![Dependency Status](https://david-dm.org/lirantal/cron-to-quartz.svg)](https://david-dm.org/lirantal/cron-to-quartz)
[![Build](https://travis-ci.org/lirantal/cron-to-quartz.svg?branch=master)](https://travis-ci.org/lirantal/cron-to-quartz)
[![Coverage Status](https://coveralls.io/repos/github/lirantal/cron-to-quartz/badge.svg?branch=master)](https://coveralls.io/github/lirantal/cron-to-quartz?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/lirantal/cron-to-quartz/badge.svg)](https://snyk.io/test/github/lirantal/cron-to-quartz)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/lirantal/cron-to-quartz.svg)](https://greenkeeper.io/)

# cron-to-quartz
Node.js JavaScript library to convert unix or linux CRON syntax to [Quartz Scheduler](http://www.quartz-scheduler.org)

# Install

## Pre-requisite 

* Node.js 

## As a dependency of another project
Install the module as a dependency in your project so you can easily require it and use it as a library

```javascript
yarn add cron-to-quartz
```

## As a library to use
To use the `cron-to-quartz` as a library to work with and explore, you should clone the repository and install required modules.
* Note: the node.js `grunt` task runner is required as a build tool for the library

```bash
git clone https://github.com/lirantal/cron-to-quartz.git
cd cron-to-quartz
yarn install
```

You can then run the test suite:
```bash
yarn run test
```

# Usage

In your NodeJS projects, simply require this library:

```javascript
var C2Q = require('../index.js');
```

Then you can just query the `C2Q` object with any cron notation as seen in the following examples:

```javascript
var quartz = C2Q.getQuartz('@hourly');
var quartz = C2Q.getQuartz('0 0,12 1 */2 *');
var quartz = C2Q.getQuartz('00 11,13 * * *');
```

## Special cases
The Quartz Scheduler isn't fully compatible with the CRON notation, so while CRON allows logical OR expressions, Quartz doesn't do that. For this reason, if you provide such CRON syntax, then the `C2Q` object will yield an array of 2 values:

```javascript
var quartz = C2Q.getQuartz('0 4 15-21 * 1');
```

# Resources
[CronMaker](http://www.cronmaker.com) is an online web-based utility to help build and test expressions that are compatible with the [Quartz](http://www.quartz-scheduler.org) open source schedule.
[cron.guru](http://crontab.guru) is an online web-based utility to translate a valid Linux CRON expression to an actual human readable schedule
[Quartz Scheduler Developer Guide](https://quartz-scheduler.org/generated/2.2.2/pdf/Quartz_Scheduler_Developer_Guide.pdf)

# Author
Liran Tal <liran.tal@gmail.com>
