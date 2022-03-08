const milisecond = 1;
const second = 1000 * milisecond;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

module.exports = (amount, unit) => {
  if (Number.isNaN(amount)) throw new Error(`${amount} is not a number`);

  switch (unit) {
    case 'miliseconds':
    case 'milisecond':
      return amount * milisecond;

    case 'seconds':
    case 'second':
      return amount * second;

    case 'minutes':
    case 'minute':
      return amount * minute;

    case 'hours':
    case 'hour':
      return amount * hour;

    case 'days':
    case 'day':
      return amount * day;

    default:
      throw new Error(`${unit} is unsupported unit of time`);
  }
};
