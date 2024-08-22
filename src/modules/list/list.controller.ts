import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
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
  ) {
    const userExists = await this.userService.existUser(params.userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return await this.listService.createList(params.userId, createListDto);
  }

  @Put(':id')
  async updateList(
    @Param() params: { id: number },
    @Body() updateListDto: UpdateListDto,
  ) {
    const existList = await this.listService.existList(params.id);

    if (!existList) {
      throw new NotFoundException('List not found');
    }

    return await this.listService.updateList(params.id, updateListDto);
  }

  @Get()
  async getLists() {
    return await this.listService.getLists();
  }

  @Delete(':id')
  async deleteList(@Param() params: { id: number }) {
    const existList = await this.listService.existList(params.id);

    if (!existList) {
      throw new NotFoundException('List not found');
    }

    return await this.listService.deleteList(params.id);
  }
}
