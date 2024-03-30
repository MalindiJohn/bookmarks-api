/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  // Return the user object that is stored in the request by the JwtAuthGuard.
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if(data){

      return request.user[data]
    }
    return request.user;
});

// This decorator will allow us to access the data property of our token which contains the