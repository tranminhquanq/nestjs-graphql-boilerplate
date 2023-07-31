import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ForbiddenException } from '@/common/exceptions/forbidden.exception';

const isDev = process.env.NODE_ENV === 'development';
const devAllowList = ['https://localhost:3000'];
const prodAllowList = [];
export const ALLOW_LIST = new Set(isDev ? devAllowList : prodAllowList);

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (isDev) return callback(null, true);
    if (origin && origin.startsWith('https://') && ALLOW_LIST.has(origin)) {
      callback(null, true);
    } else {
      callback(
        new ForbiddenException('Not allowed by CORS', 'cors_not_allowed'),
      );
    }
  },
};
