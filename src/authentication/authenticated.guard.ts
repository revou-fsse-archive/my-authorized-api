import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      return request.isAuthenticated();
    }

    if ((context.getType() as string) === 'graphql') {
      const request = GqlExecutionContext.create(context).getContext().req;
      return request.isAuthenticated();
    }

    return false;
  }
}
