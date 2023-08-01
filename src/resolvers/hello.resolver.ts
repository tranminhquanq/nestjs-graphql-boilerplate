import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'hello from graphql';
  }
}
