import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRATION_TOKEN } from './constants';
import { env } from 'src/shared/config/env';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: JWT_EXPIRATION_TOKEN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
