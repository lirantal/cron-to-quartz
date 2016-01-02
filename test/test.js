'use strict'
/**
 * Tests
 * @module tests
 */

/**
 * Module dependencies.
 */
var should = require('should');
var C2Q = require('../index.js');

describe('CRON to Quartz - Test Suite', function () {

  describe('Sanity Tests for CRON to Quartz conversion', function() {

    it('should return an auth token', function() {

		a = c.getQuartz('@hourly');
		console.log(a);

        should.not.exist(err);

        body.should.be.an.instanceof(Object).and.have.property('access_token');
        body.should.be.an.instanceof(Object).and.have.property('token_type');
        body.should.be.an.instanceof(Object).and.have.property('expires_in');
        body.should.be.an.instanceof(Object).and.have.property('scope');

      });
    });

  });

});
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
	//var crontab = '0 0 1 1 *';
