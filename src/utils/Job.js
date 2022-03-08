const milisecond = 1;
const second = 1000 * milisecond;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

class Job {
  constructor(JobHandler) {
    this.jobHandler = new JobHandler();
  }

  every(amount, unit) {
    if (Number.isNaN(amount)) throw new Error(`${amount} is not a number`);

    switch (unit) {
      case 'miliseconds':
      case 'milisecond':
        this.interval = amount * milisecond;
        return this;

      case 'seconds':
      case 'second':
        this.interval = amount * second;
        return this;

      case 'minutes':
      case 'minute':
        this.interval = amount * minute;
        return this;

      case 'hours':
      case 'hour':
        this.interval = amount * hour;
        return this;

      case 'days':
      case 'day':
        this.interval = amount * day;
        return this;

      default:
        throw new Error(`${unit} is unsupported unit of time`);
    }
  }

  run() {
    if (this.timer) return this.timer;
    if (!this.interval) throw new Error('interval is not provided. Please use .every() method before calling .run()');

    const timeoutFunction = () => setTimeout(async () => {
      try {
        await this.jobHandler.handler();
      } catch (e) {
        console.error(e);
      }

      // if timer is not stopped then repeat function
      if (this.timer) this.timer = timeoutFunction();
    }, this.interval);

    this.timer = timeoutFunction();
    return this.timer;
  }

  cancel() {
    if (!this.timer) return;

    clearTimeout(this.timer);
    this.timer = null;
  }
}

module.exports = Job;
