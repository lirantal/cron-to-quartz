'use strict';

/**
 * cron-to-quartz
 * @module cron-to-quartz
 *
 * CRON To Quartz library enables converting Unix CRON schedule syntax to Quartz Scheduler syntax.
 * Some CRON syntaxes aren't fully supported by Quartz, for example specifying both DOM and DOW.
 */

/**
 * Object declaration
 * C2Q - Cron 2 Quartz conversion library
 *
 */
var C2Q = {};

/** 
 * Get a Quartz CRON notation from provided Unix CRON syntax
 * getQuartz
 *
 * Expects to get a Unix CRON syntax format, for example: 00 11,13 * * *
 * 
 * @param {string} unix CRON format
 * @return {array} array of arrays
 *   for example:
 *    [ 
 *     ['0', '00', '11,13', '*', '*', '?', '*' ]
 *    ]
 *
 *
 */
C2Q.getQuartz = function(crontab) {

	var data = [];
	var quartzEntry = [];
	
	// check for cron magic entries
	quartzEntry = parseCronMagics(crontab);

	if (quartzEntry) {
		data.push(quartzEntry);
	} else {

		// if cron magic entries not found, proceed to parsing normal cron format
		var crontabEntry = crontab.split(' ');
		quartzEntry = parseCronSyntax(crontabEntry);

		data.push(quartzEntry);

		// Quartz doesn't support both DOM and DOW definitions so if we find such ocurrence we'll need to
		// create 2 Quartz entries, one with DOM and one with DOW to create an OR expression

		if (crontabEntry[2] !== '*' && crontabEntry[4] !== '*') {

			// by default, parseCronSyntax() gives priority to parse the DOM first so we reset it now to * to
			// make sure we also have a variant of the CRON expression with DOW
			crontabEntry[2] = '*';

			quartzEntry = parseCronSyntax(crontabEntry);
			data.push(quartzEntry);
		}

	}

	return data;
};


function advanceNumber(str) {

	var quartzCompatibleStr = '';
	var num;
	str.split('').forEach(function(chr) {

		num = parseInt(chr);

		if (num) {
			quartzCompatibleStr += num+1;
		} else {
			quartzCompatibleStr += chr;
		}



	});

	return quartzCompatibleStr;
}

/**
 * parse cron 
 * parseCronMagics
 *
 * @param {string} a string representation of a unix CRON entry
 * @return {array} an array representation of a Quartz CRON entry
 *
 */
function parseCronSyntax(crontabEntry) {

	var quartzEntry = [];

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
				item = '?';
			}
			
			quartzEntry.push(item);
		}

		// index 3 = Month
		if (index === 3) {
			quartzEntry.push(item);
		}

		// index 4 = DOW = Day of Week
		if (index === 4) {

			// day of week needs another adjustments - it is specified as 1-7 in quartz but 0-6 in crontab
			var itemAbbreviated = advanceNumber(item);

			if (toggleQuartzCompat === true) {
				quartzEntry.push('?');
			} else {
				quartzEntry.push(itemAbbreviated);
			}
		}

		// beyond index 4 we don't care and exit the loop
		if (index >= 5) {
			return true;
		}

	});


	// quartz expect a last 7th parameter for scheduling yearly recurrence so we pass * by default for all years
	quartzEntry.push('*');

	return quartzEntry;

}


/**
 * parse cron format specified with the shorthand magic @ entries, for example: @hourly
 * parseCronMagics
 *
 * @param {string} a string representation of a unix CRON entry
 * @return {array} an array representation of a Quartz CRON entry
 *
 */
function parseCronMagics(crontab) {

	var quartzEntry = false;

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

	return quartzEntry || false;
}

module.exports = C2Q;
