import 'dotenv/config'

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: requireEnv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/portfolio'),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
}

export const isProduction = env.nodeEnv === 'production'
