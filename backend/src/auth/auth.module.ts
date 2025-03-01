import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module'; // 👈 Import PrismaModule

@Module({
  imports: [
    PrismaModule, // 👈 Ensure PrismaModule is imported
    JwtModule.register({
      secret: 'your_jwt_secret', // 👈 Replace with an env variable later
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
