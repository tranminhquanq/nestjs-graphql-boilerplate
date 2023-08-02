declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    // rate limit
    THROTTLE_TTL: number;
    THROTTLE_LIMIT: number;
    // jwt
    JWT_SECRET: string;
  }
}
