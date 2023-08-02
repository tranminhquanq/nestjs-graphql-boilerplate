import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HelmetOptions } from 'helmet';
import { join } from 'path';
import {
  ConfigModuleOptions,
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { ForbiddenException } from '@/common/exceptions/forbidden.exception';
import {
  ALLOW_LIST,
  isDev,
  protocols,
  tokenLifeTime,
} from '@/common/constants';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (isDev) return callback(null, true);
    const allowedProtocol = Array.from(protocols.values()).some((protocol) =>
      origin.startsWith(protocol),
    );
    if (origin && allowedProtocol && ALLOW_LIST.has(origin)) {
      callback(null, true);
    } else {
      callback(
        new ForbiddenException('Not allowed by CORS', 'cors_not_allowed'),
      );
    }
  },
};

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
};

export const throttlerAsyncOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    ttl: config.get('THROTTLE_TTL'),
    limit: config.get('THROTTLE_LIMIT'),
    ignoreUserAgents: [/googlebot/gi, new RegExp('bingbot', 'gi')],
  }),
};

export const apolloDriverConfigOptions: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: isDev,
};

export const helmetConfigOptions: HelmetOptions = {
  crossOriginEmbedderPolicy: !isDev,
  contentSecurityPolicy: isDev && {
    directives: {
      imgSrc: [
        `'self'`,
        'data:',
        'apollo-server-landing-page.cdn.apollographql.com',
      ],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      manifestSrc: [
        `'self'`,
        'apollo-server-landing-page.cdn.apollographql.com',
      ],
      frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
    },
  },
};

export const jwtAsyncConfigOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    global: true,
    secret: config.get('JWT_SECRET'),
    signOptions: {
      expiresIn: tokenLifeTime.access,
    },
  }),
};
