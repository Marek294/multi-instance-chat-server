import cors from 'cors'
import config from '../config/vars'
import errors from '../utils/APIError'


const corsOptions = {
  credentials: true,
  origin: (origin: string | null | undefined, callback: Function) => {
    if (config.corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(errors.domainNotWhitelisted());
    }
  },
};

export default () => cors(corsOptions);
