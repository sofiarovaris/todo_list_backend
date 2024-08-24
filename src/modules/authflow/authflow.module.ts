// src/modules/authflow/authflow.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import AuthflowProvider from './authflow.provider';
import { AuthflowController } from './authflow.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthflowController],
  providers: [AuthflowProvider(process.env.AUTH_FLOW)],
  exports: [AuthflowProvider(process.env.AUTH_FLOW)],
})
export class AuthflowModule {}
