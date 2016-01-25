[![view on npm](http://img.shields.io/npm/v/cron-to-quartz.svg)](https://www.npmjs.org/package/cron-to-quartz)
[![view on npm](http://img.shields.io/npm/l/cron-to-quartz.svg)](https://www.npmjs.org/package/cron-to-quartz)
[![npm module downloads](http://img.shields.io/npm/dt/cron-to-quartz.svg)](https://www.npmjs.org/package/cron-to-quartz)
[![Dependency Status](https://david-dm.org/lirantal/cron-to-quartz.svg)](https://david-dm.org/lirantal/cron-to-quartz)
[![Build](https://travis-ci.org/lirantal/cron-to-quartz.svg?branch=master)](https://travis-ci.org/lirantal/cron-to-quartz)
[![Coverage Status](https://coveralls.io/repos/lirantal/cron-to-quartz/badge.svg?branch=master&service=github)](https://coveralls.io/github/lirantal/cron-to-quartz?branch=master)

# cron-to-quartz
NodeJS JavaScript library to convert unix or linux CRON syntax to [http://www.quartz-scheduler.org/](Quartz Scheduler)


# Install

## Pre-requisite 

* NodeJS tool with npm for installing packages
* Grunt build tool

## As a dependency of another project
Install the module as a depdency in your project so you can easily require it and use it as a library

```javascript
npm install cron-to-quartz --save
```

## As a library to use
To use the `cron-to-quartz` as a library to work with and explore, you should clone the repository and install required modules.
* Note: the nodejs `grunt` task runner is required as a build tool for the library

```bash
git clone https://github.com/lirantal/cron-to-quartz.git
cd cron-to-quartz
npm install
```

You can then run the test suite:
```bash
npm test
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
[http://www.cronmaker.com/](CronMaker) is an online web-based utility to help build and test expressions that are comptaible with the [http://www.quartz-scheduler.org](Quartz) open source schedule.

# Author
Liran Tal <liran.tal@gmail.com>
