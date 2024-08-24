// src/modules/authflow/authflow.controller.ts
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthFlowInterface } from './authflow.interface';

@Controller('auth')
export class AuthflowController {
  constructor(
    @Inject('AuthFlowService')
    private readonly authFlowService: AuthFlowInterface,
  ) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authFlowService.validateUser(email, password);
    return this.authFlowService.login(user);
  }
}
