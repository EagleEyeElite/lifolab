import { cleanEnv, str, url } from 'envalid'
import { loadEnvFiles } from './loadEnv'

// Load env files before validation (only in non-production)
if (process.env.NODE_ENV !== 'production') {
  loadEnvFiles();
}

export const schema = {
  WORDPRESS_CMS_PUBLIC_URL: url(),
  FRONTEND_NEXTJS_PASSWORD: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
}

export const env = cleanEnv(process.env, schema)
