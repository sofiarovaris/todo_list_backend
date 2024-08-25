import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthFlowInterface } from './authflow.interface';
import { LoginDto } from './dto/login.dto';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthflowController {
  constructor(
    @Inject('AuthFlowService')
    private readonly authFlowService: AuthFlowInterface,
  ) {}

  @Post('login')
  @ApiOkResponse({ description: 'User successfully logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authFlowService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return await this.authFlowService.login(user);
  }
}
