import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../types/authenticatedRequest.types';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: AuthenticatedRequest = ctx.switchToHttp().getRequest();
  return req.user?.userId;
});
