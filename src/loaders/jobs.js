const Job = require('../utils/Job');
const DummyJob = require('../jobs/dummy');

module.exports = () => {
  new Job(DummyJob).every(1, 'hour').run();
};
