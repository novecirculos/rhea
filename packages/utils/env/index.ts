import { merge } from 'lodash'
import { env } from './env'

type EnvironmentVariables = Record<string, string>

export function getEnvironmentVariables(
  options: EnvironmentVariables = {}
): EnvironmentVariables {
  const envVars: EnvironmentVariables = merge(env, process.env, options)
  Object.assign(process.env, envVars)
  return envVars
}

export * from './env'
