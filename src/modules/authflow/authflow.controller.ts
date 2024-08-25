import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthFlowInterface } from './authflow.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthflowController {
  constructor(
    @Inject('AuthFlowService')
    private readonly authFlowService: AuthFlowInterface,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authFlowService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return await this.authFlowService.login(user);
  }
}
