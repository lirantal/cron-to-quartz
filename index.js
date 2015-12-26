'use strict'

/*

tests:

cron:   0 0,12 1 *\/2 *
quartz: 0 0 0,12 1 *\/2 ? *

cron:   * * * * *
quartz: 0 * * * * ? *


cron: 00 11,13 * * *
quartz: 0 00 11,13 * * ? *

cron: 00 03-18 * * 1-5 
qaurtz: 0 00 03-18 ? * 1-5 *

cron: *\/10 * * * *
quartz:

cron: 0 4 15-21 * 1
quartz: 0 0 4 15-21 * ? *

cron: 0 4 8-14 * *
quartz: 0 0 4 8-14 * ? *


*/

//var str = '0 0,12 1 */2 *';
//var str = '* * * * *';
//var str = '00 11,13 * * *';
//var str = '00 03-18 * * 1-5';
//var str = '*/10 * * * *';
//var str = '0 4 15-21 * 1';
//var str = '0 4 8-14 * *';
var crontab = '0 0 1 1 *';

var crontabEntry = crontab.split(' ');

console.log('cron:');
console.log(crontabEntry);

var quartzEntry = [];


/*
 * handling crontab magic entries, specified as shortcuts for common recurrence scheduling
 */

// @hourly
if (crontab.indexOf('@hourly') === 0) {
	quartzEntry = ['0', '0', '*', '*', '*', '?', '*'];
}

// @daily and @midnight
if (crontab.indexOf('@daily') === 0 || crontab.indexOf('@midnight') === 0) {
	quartzEntry = ['0', '0', '0', '*', '*', '?', '*'];
}

// @weekly
if (crontab.indexOf('@weekly') === 0) {
	quartzEntry = ['0', '0', '0', '?', '*', '1', '*'];
}

// @monthly
if (crontab.indexOf('@monthly') === 0) {
	quartzEntry = ['0', '0', '0', '1', '*', '?', '*'];
}

// @yearly and @annually
if (crontab.indexOf('@yearly') === 0 || crontab.indexOf('@annually') === 0) {
	quartzEntry = ['0', '0', '0', '1', '1', '?', '*'];
}

return quartzEntry;


// first we initialize the seconds to 0 by default because linux CRON entries do not include a seconds definition
quartzEntry.push('0');

// quartz scheduler can't handle an OR definition, and so it doesn't support both DOM and DOW fields to be defined
// for this reason we need to shift one of them to be the value or * and the other to be ?
var toggleQuartzCompat = false;

crontabEntry.forEach(function(item, index, array) {


    // index 0 = minutes
	// index 1 = hours
	// these cron definitions should be compatible with quartz so we push them as is
	if (index === 0 || index === 1) {
		quartzEntry.push(item);
	}

	// index 2 = DOM = Day of Month
	if (index === 2) {
		if (item !== '?') {
			toggleQuartzCompat = true;
		}

		if (item === '*') {
			toggleQuartzCompat = false;
			item = '?'
		}
		
		quartzEntry.push(item);
	}

	// index 3 = Month
	if (index === 3) {
		quartzEntry.push(item);
	}

	// index 4 = DOW = Day of Week
	// @TODO day of week needs another adjustments - it is specified as 1-7 in quartz but 0-6 in crontab
	if (index === 4) {
		if (toggleQuartzCompat === true) {
			quartzEntry.push('?');
		} else {
			quartzEntry.push(item);
		}
	}

	// beyond index 4 we don't care and exit the loop
	if (index >= 5) {
		return true;
	}

});


// quartz expect a last 7th parameter for scheduling yearly recurrence so we pass * by default for all years
quartzEntry.push('*');


console.log('quartz:');
console.log(quartzEntry);
console.log(quartzEntry.join(' '));