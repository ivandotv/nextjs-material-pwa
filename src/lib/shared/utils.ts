export function toBoolean(env: string | undefined, initial: boolean) {
  if (typeof env !== 'undefined') {
    return env === 'true'
  }

  return initial
}

export function toNumber(env: string | undefined, initial: number) {
  if (typeof env !== 'undefined') {
    return parseInt(env, 10)
  }

  return initial
}

export function assertEnv(value: string): string {
  const env = process.env[value]
  if (typeof env === 'undefined') {
    throw new Error(`Env: ${value} not present`)
  }

  return env
}

export function isSSR() {
  return typeof window === 'undefined'
}
