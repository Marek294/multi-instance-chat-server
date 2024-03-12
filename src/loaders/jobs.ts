import Job from '../utils/Job';
import DummyJob from '../jobs/dummy';

export default () => {
  new Job(DummyJob).every(10, 'second').run({ immediately: true });
};
