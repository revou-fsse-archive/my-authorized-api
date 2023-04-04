import { Context, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { AuthenticatedGuard } from '../authentication/authenticated.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class GraphqlApiResolver {
  @Query(() => User)
  @UseGuards(AuthenticatedGuard)
  currentUser(@Context() context): User {
    return { username: context.req.user.username };
  }

  @Query(() => Number)
  randomNumber(): number {
    return 42;
  }
}
