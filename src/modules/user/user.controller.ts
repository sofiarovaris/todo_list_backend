import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
