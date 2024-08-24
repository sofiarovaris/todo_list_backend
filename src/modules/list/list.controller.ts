import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UserService } from '../user/user.service';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly userService: UserService,
  ) {}

  @Post(':userId')
  async createList(
    @Param() params: { userId: number },
    @Body() createListDto: CreateListDto,
    @Req() req,
  ) {
    const userExists = await this.userService.existUser(params.userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (req.user.id !== params.userId) {
      throw new ForbiddenException('Trying to create list for another user');
    }

    return await this.listService.createList(params.userId, createListDto);
  }

  @Put(':id')
  async updateList(
    @Param() params: { id: number },
    @Body() updateListDto: UpdateListDto,
    @Req() req,
  ) {
    const list = await this.listService.getListById(params.id);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (req.user.id !== list.user.id) {
      throw new ForbiddenException('Trying to update list for another user');
    }

    return await this.listService.updateList(params.id, updateListDto);
  }

  @Get(':userId')
  async getListsByUser(@Param() params: { userId: number }, @Req() req) {
    const userExists = await this.userService.existUser(params.userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (req.user.id !== params.userId) {
      throw new ForbiddenException('Trying to get lists for another user');
    }

    return await this.listService.getListsByUser(params.userId);
  }

  @Delete(':id')
  async deleteList(@Param() params: { id: number }, @Req() req) {
    const list = await this.listService.getListById(params.id);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (req.user.id !== list.user.id) {
      throw new ForbiddenException('Trying to delete list for another user');
    }

    return await this.listService.deleteList(params.id);
  }
}
