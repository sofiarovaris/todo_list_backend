import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOkResponse({ description: 'Get user info' })
  async getUser(@Req() req) {
    return await this.userService.getUser(req.user.id);
  }
}
