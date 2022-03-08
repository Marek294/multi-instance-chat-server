const debug = require('debug')('server:set-environment');

[
  'PORT',
  'INCLUDE_JOBS',
  'CORS_WHITELIST',
]
  .filter((item) => !Object.keys(process.env).includes(item))
  .map((item) => {
    throw new Error(`production required filled env keys ${item}`);
  });

const parseConf = (label, parse = false) => {
  const env = process.env[label];
  if (!env) return env;
  let parsedConf = String(env);

  if (parse) {
    try {
      parsedConf = JSON.parse(parsedConf);
    } catch (e) {
      throw new Error(`ERROR PARSE ENV: ${label}`);
    }
  }
  debug(label);

  return parsedConf;
};

module.exports = {
  env: process.env.NODE_ENV,
  dev: process.env.NODE_ENV !== 'production',
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  port: parseConf('PORT'),
  includeJobs: parseConf('INCLUDE_JOBS') === 'true',
  corsWhitelist: parseConf('CORS_WHITELIST', true),
};
