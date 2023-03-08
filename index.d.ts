declare module 'cron-to-quartz' {
  /**
 * The Quartz Scheduler isn't fully compatible with the CRON notation, so while CRON allows logical OR expressions, Quartz doesn't do that. 
 * For this reason, if you provide such CRON syntax, then the C2Q object will yield an array of 2 values
 * @type {string}
 */
  function getQuartz(crontab: string): Array<T>;
}
