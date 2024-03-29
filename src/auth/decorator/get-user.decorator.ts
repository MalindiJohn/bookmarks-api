/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  // Return the user object that is stored in the request by the JwtAuthGuard.
    const request: Express.Request = ctx.switchToHttp().getRequest();

    return request.user;
});

// This decorator will allow us to access the data property of our token which contains the