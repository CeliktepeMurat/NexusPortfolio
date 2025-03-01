import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * This guard ensures that only authenticated users can access protected routes.
   * It automatically triggers the JwtStrategy to validate the JWT token.
   */
  canActivate(context: ExecutionContext) {
    return super.canActivate(context); // Calls the JwtStrategy to validate the token
  }
}
