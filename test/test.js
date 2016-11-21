'use strict';

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

    it('CRON @hourly should resolve to a proper quartz configuration', function() {

    	var quartz = C2Q.getQuartz('@hourly');

    	quartz.should.be.an.instanceof(Array).and.have.length(1);

    	var quartzConfigArray = quartz.pop();
    	quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr = quartzConfigArray.join(' ');
		quartzConfigStr.should.be.an.instanceof(String);
		quartzConfigStr.should.be.equal('0 0 * * * ? *');

    });

    it('CRON 0 0,12 1 */2 * should resolve to a proper quartz configuration', function() {

    	var quartz = C2Q.getQuartz('0 0,12 1 */2 *');

    	quartz.should.be.an.instanceof(Array).and.have.length(1);

    	var quartzConfigArray = quartz.pop();
    	quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr = quartzConfigArray.join(' ');
		quartzConfigStr.should.be.an.instanceof(String);
		quartzConfigStr.should.be.equal('0 0 0,12 1 */2 ? *');

    });

    it('CRON * * * * * should resolve to a proper quartz configuration', function() {

    	var quartz = C2Q.getQuartz('* * * * *');

    	quartz.should.be.an.instanceof(Array).and.have.length(1);

    	var quartzConfigArray = quartz.pop();
    	quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr = quartzConfigArray.join(' ');
		quartzConfigStr.should.be.an.instanceof(String);
		quartzConfigStr.should.be.equal('0 * * ? * * *');

    });

    it('CRON 00 11,13 * * * should resolve to a proper quartz configuration', function() {

    	var quartz = C2Q.getQuartz('00 11,13 * * *');

    	quartz.should.be.an.instanceof(Array).and.have.length(1);

    	var quartzConfigArray = quartz.pop();
    	quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr = quartzConfigArray.join(' ');
		quartzConfigStr.should.be.an.instanceof(String);
		quartzConfigStr.should.be.equal('0 00 11,13 ? * * *');

    });

    it('CRON 00 03-18 * * 1-5 should resolve to a proper quartz configuration', function() {

    	var quartz = C2Q.getQuartz('00 03-18 * * 1-5');

    	quartz.should.be.an.instanceof(Array).and.have.length(1);

    	var quartzConfigArray = quartz.pop();
    	quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr = quartzConfigArray.join(' ');
		quartzConfigStr.should.be.an.instanceof(String);
		quartzConfigStr.should.be.equal('0 00 03-18 ? * 2-6 *');

    });

    it('CRON */10 * * * * should resolve to a proper quartz configuration', function() {

    	var quartz = C2Q.getQuartz('*/10 * * * *');

    	quartz.should.be.an.instanceof(Array).and.have.length(1);

    	var quartzConfigArray = quartz.pop();
    	quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr = quartzConfigArray.join(' ');
		quartzConfigStr.should.be.an.instanceof(String);
		quartzConfigStr.should.be.equal('0 */10 * ? * * *');

    });

    it('CRON 0 4 15-21 * 1 should resolve to a proper quartz configuration - supporting and yielding 2 quartz configs', function() {

    	// The following is a complex CRON expression which basically creates an OR between DOM and DOW
    	// It is sepcialy because it yields 2 arrays for possible values to create for a Quartz scheduler
    	var quartz = C2Q.getQuartz('0 4 15-21 * 1');

    	quartz.should.be.an.instanceof(Array).and.have.length(2);

    	// Extract array notation 1
    	var quartzConfigArray2 = quartz.pop();
    	quartzConfigArray2.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr2 = quartzConfigArray2.join(' ');
		quartzConfigStr2.should.be.an.instanceof(String);

		quartzConfigStr2.should.be.equal('0 0 4 ? * 2 *');

		// Extract array notation 2
		var quartzConfigArray1 = quartz.pop();
    	quartzConfigArray1.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr1 = quartzConfigArray1.join(' ');
		quartzConfigStr1.should.be.an.instanceof(String);

		quartzConfigStr1.should.be.equal('0 0 4 15-21 * ? *');

    });

    it('CRON 0 4 8-14 * * should resolve to a proper quartz configuration', function() {

    	var quartz = C2Q.getQuartz('0 4 8-14 * *');

    	quartz.should.be.an.instanceof(Array).and.have.length(1);

    	var quartzConfigArray = quartz.pop();
    	quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

    	var quartzConfigStr = quartzConfigArray.join(' ');
		quartzConfigStr.should.be.an.instanceof(String);
		quartzConfigStr.should.be.equal('0 0 4 8-14 * ? *');

    });

    it('CRON 00 16,11 * * * should resolve to a proper quartz configuration', function() {

        var quartz = C2Q.getQuartz('00 16,11 * * *');

        quartz.should.be.an.instanceof(Array).and.have.length(1);

        var quartzConfigArray = quartz.pop();
        quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

        var quartzConfigStr = quartzConfigArray.join(' ');
        quartzConfigStr.should.be.an.instanceof(String);
        quartzConfigStr.should.be.equal('0 00 16,11 ? * * *');

    });

    it('CRON 00 09-18 * * * should resolve to a proper quartz configuration', function() {

        var quartz = C2Q.getQuartz('00 09-18 * * *');

        quartz.should.be.an.instanceof(Array).and.have.length(1);

        var quartzConfigArray = quartz.pop();
        quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

        var quartzConfigStr = quartzConfigArray.join(' ');
        quartzConfigStr.should.be.an.instanceof(String);
        quartzConfigStr.should.be.equal('0 00 09-18 ? * * *');

    });

    it('CRON 00 09-18 * * 1-5 should resolve to a proper quartz configuration', function() {

        var quartz = C2Q.getQuartz('00 09-18 * * 1-5');

        quartz.should.be.an.instanceof(Array).and.have.length(1);

        var quartzConfigArray = quartz.pop();
        quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

        var quartzConfigStr = quartzConfigArray.join(' ');
        quartzConfigStr.should.be.an.instanceof(String);
        quartzConfigStr.should.be.equal('0 00 09-18 ? * 2-6 *');

    });

      it('CRON Day of Week sanity test ', function() {

          var quartz = C2Q.getQuartz('5 10 * 11 1');

          quartz.should.be.an.instanceof(Array).and.have.length(1);

          var quartzConfigArray = quartz.pop();
          quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

          var quartzConfigStr = quartzConfigArray.join(' ');
          quartzConfigStr.should.be.an.instanceof(String);
          quartzConfigStr.should.be.equal('0 5 10 ? 11 2 *');

      });

      it('CRON Day of Week handle 0 as starting day of the week default to Sunday', function() {

          var quartz = C2Q.getQuartz('5 10 * 11 0');

          quartz.should.be.an.instanceof(Array).and.have.length(1);

          var quartzConfigArray = quartz.pop();
          quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

          var quartzConfigStr = quartzConfigArray.join(' ');
          quartzConfigStr.should.be.an.instanceof(String);
          quartzConfigStr.should.be.equal('0 5 10 ? 11 1 *');

      });

      it('CRON Day of Week handle 8 as starting day of the week which defaults to Sunday', function() {

          var quartz = C2Q.getQuartz('5 10 * 11 0');

          quartz.should.be.an.instanceof(Array).and.have.length(1);

          var quartzConfigArray = quartz.pop();
          quartzConfigArray.should.be.an.instanceof(Array).and.have.length(7);

          var quartzConfigStr = quartzConfigArray.join(' ');
          quartzConfigStr.should.be.an.instanceof(String);
          quartzConfigStr.should.be.equal('0 5 10 ? 11 1 *');

      });

  });

});
