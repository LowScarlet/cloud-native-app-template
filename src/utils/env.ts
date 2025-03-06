export interface EnvVariables {
  NODE_ENV: "dev" | "production" | "test";
  BACKEND_URL: string;
  FRONTEND_URL: string;

  JWT_SECRET: string;

  DATABASE_URL: string;

  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_BUCKET_NAME: string;
  AWS_REGION: string;

  ENABLE_UPLOAD: boolean;

  ENABLE_AWSS3: boolean;
  ENABLE_GCAPTCHA: boolean;
  ENABLE_EMAIL: boolean;
}

export function getEnvVariable<T extends keyof EnvVariables>(
  key: T,
): EnvVariables[T] {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value as EnvVariables[T];
}
