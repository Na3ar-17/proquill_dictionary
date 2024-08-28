import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const user = request.user;

    return data ? user[data] : user;
  },
);
