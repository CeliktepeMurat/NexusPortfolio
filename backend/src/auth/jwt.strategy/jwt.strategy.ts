/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts token from "Authorization" header,
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'mysecretkey', // Use .env in production
    });
  }

  /**
   * Validates the user's token.
   * @param payload The data stored in the user's token.
   * @returns The user's data.
   */

  validate(payload: { userId: number; email: string }) {
    return {
      userId: payload.userId,
      email: payload.email,
    };
  }
}
