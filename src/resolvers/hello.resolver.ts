import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from '@/common/guards/auth.guard';

@Public()
@SkipThrottle()
@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'hello from graphql';
  }
}
