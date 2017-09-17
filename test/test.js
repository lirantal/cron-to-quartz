'use strict'

var C2Q = require('../index.js')

describe('CRON to Quartz - Test Suite', () => {

  describe('Sanity Tests for CRON to Quartz conversion', () => {

    test(
      'CRON @hourly should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('@hourly')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 0 * * * ? *')

      }
    )

    test(
      'CRON @daily should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('@daily')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 0 0 * * ? *')

      }
    )

    test(
      'CRON @weekly should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('@weekly')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 0 0 ? * 1 *')

      }
    )

    test(
      'CRON @monthly should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('@monthly')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 0 0 1 * ? *')

      }
    )

    test(
      'CRON @monthly should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('@yearly')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 0 0 1 1 ? *')

      }
    )

    test(
      'CRON 0 0,12 1 */2 * should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('0 0,12 1 */2 *')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 0 0,12 1 */2 ? *')

      }
    )

    test(
      'CRON * * * * * should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('* * * * *')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 * * ? * * *')

      }
    )

    test(
      'CRON 00 11,13 * * * should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('00 11,13 * * *')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 00 11,13 ? * * *')

      }
    )

    test(
      'CRON 00 03-18 * * 1-5 should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('00 03-18 * * 1-5')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 00 03-18 ? * 2-6 *')

      }
    )

    test(
      'CRON */10 * * * * should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('*/10 * * * *')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 */10 * ? * * *')

      }
    )

    test(
      'CRON 0 4 15-21 * 1 should resolve to a proper quartz configuration - supporting and yielding 2 quartz configs',
      () => {

        // The following is a complex CRON expression which basically creates an OR between DOM and DOW
        // It is sepcialy because it yields 2 arrays for possible values to create for a Quartz scheduler
        var quartz = C2Q.getQuartz('0 4 15-21 * 1')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(2)

        // Extract array notation 1
        var quartzConfigArray2 = quartz.pop()
        expect(quartzConfigArray2).toBeInstanceOf(Array)
        expect(quartzConfigArray2).toHaveLength(7)

        var quartzConfigStr2 = quartzConfigArray2.join(' ')
        expect(quartzConfigStr2).toBe('0 0 4 ? * 2 *')

        // Extract array notation 2
        var quartzConfigArray1 = quartz.pop()
        expect(quartzConfigArray1).toBeInstanceOf(Array)
        expect(quartzConfigArray1).toHaveLength(7)

        var quartzConfigStr1 = quartzConfigArray1.join(' ')
        expect(quartzConfigStr1).toBe('0 0 4 15-21 * ? *')

      }
    )

    test(
      'CRON 0 4 8-14 * * should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('0 4 8-14 * *')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 0 4 8-14 * ? *')

      }
    )

    test(
      'CRON 00 16,11 * * * should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('00 16,11 * * *')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 00 16,11 ? * * *')

      }
    )

    test(
      'CRON 00 09-18 * * * should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('00 09-18 * * *')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 00 09-18 ? * * *')

      }
    )

    test(
      'CRON 00 09-18 * * 1-5 should resolve to a proper quartz configuration',
      () => {

        var quartz = C2Q.getQuartz('00 09-18 * * 1-5')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 00 09-18 ? * 2-6 *')

      }
    )

    test('CRON Day of Week sanity test ', () => {

      var quartz = C2Q.getQuartz('5 10 * 11 1')

      expect(quartz).toBeInstanceOf(Array)
      expect(quartz).toHaveLength(1)

      var quartzConfigArray = quartz.pop()
      expect(quartzConfigArray).toBeInstanceOf(Array)
      expect(quartzConfigArray).toHaveLength(7)

      var quartzConfigStr = quartzConfigArray.join(' ')
      expect(quartzConfigStr).toBe('0 5 10 ? 11 2 *')

    })

    test(
      'CRON Day of Week handle 0 as starting day of the week default to Sunday',
      () => {

        var quartz = C2Q.getQuartz('5 10 * 11 0')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 5 10 ? 11 1 *')

      }
    )

    test(
      'CRON Day of Week handle 8 as starting day of the week which defaults to Sunday',
      () => {

        var quartz = C2Q.getQuartz('5 10 * 11 0')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 5 10 ? 11 1 *')

      }
    )

    test(
      'CRON syntax check should work fine with more than 5 arguments and simply ignored',
      () => {

        var quartz = C2Q.getQuartz('5 4 * * * 99 98 97')

        expect(quartz).toBeInstanceOf(Array)
        expect(quartz).toHaveLength(1)

        var quartzConfigArray = quartz.pop()
        expect(quartzConfigArray).toBeInstanceOf(Array)
        expect(quartzConfigArray).toHaveLength(7)

        var quartzConfigStr = quartzConfigArray.join(' ')
        expect(quartzConfigStr).toBe('0 5 4 ? * * *')

      }
    )

  })

})
