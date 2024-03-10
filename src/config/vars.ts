import Debug from 'debug'
const debug = Debug('server:set-environment')

type EnvType<T> =
  T extends { required: false, type: 'json' } ? Record<string, any> | undefined :
    T extends { required: true, type: 'json' } ? Record<string, any> :
      T extends { required: false, type: 'number' } ? number | undefined :
        T extends { required: true, type: 'number' } ? number :
          T extends { required: true } ? string :
            string | undefined

interface IEnvOptions {
  required: boolean,
  type?: 'json' | 'number' | undefined
};

function getEnv<T extends IEnvOptions> (key: string, opts: T): EnvType<T>
function getEnv (key: string, opts: IEnvOptions): any {
  const { required, type } = opts

  const value = process.env[key]
  if (required && value === undefined) throw new Error(`missing env - ${key}`)
  if (!required && value === undefined) return undefined

  debug(key)
  if (value !== undefined && type !== undefined && type === 'json') return JSON.parse(value)
  if (value !== undefined && type !== undefined && type === 'number') return Number(value)
  return value
}

export default {
  env: getEnv('NODE_ENV', { required: true }),
  dev: getEnv('NODE_ENV', { required: true }).toLowerCase() !== 'production',
  logs: getEnv('NODE_ENV', { required: true }).toLowerCase() === 'production' ? 'combined' : 'dev',
  port: getEnv('PORT', { required: true }),
  includeJobs: getEnv('INCLUDE_JOBS', { required: true }).toLowerCase() === 'true',
  corsWhitelist: getEnv('CORS_WHITELIST', { required: true, type: 'json' })
}

