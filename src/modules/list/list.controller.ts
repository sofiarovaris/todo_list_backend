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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('lists')
@Controller('lists')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly userService: UserService,
  ) {}

  @Post(':userId')
  @ApiCreatedResponse({ description: 'Create list' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({
    description: 'Trying to create list for another user',
  })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiBody({ type: CreateListDto })
  async createList(
    @Param() params: { userId: number },
    @Body() createListDto: CreateListDto,
    @Req() req,
  ) {
    const userExists = await this.userService.existUser(params.userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (req.user.id !== Number(params.userId)) {
      throw new ForbiddenException('Trying to create list for another user');
    }

    return await this.listService.createList(params.userId, createListDto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update list' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @ApiForbiddenResponse({
    description: 'Trying to update list for another user',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the list' })
  @ApiBody({ type: UpdateListDto })
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
  @ApiOkResponse({ description: 'Get lists by user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({
    description: 'Trying to get lists for another user',
  })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  async getListsByUser(@Param() params: { userId: number }, @Req() req) {
    const userExists = await this.userService.existUser(params.userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (req.user.id !== Number(params.userId)) {
      throw new ForbiddenException('Trying to get lists for another user');
    }

    return await this.listService.getListsByUser(params.userId);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete list' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @ApiForbiddenResponse({
    description: 'Trying to delete list for another user',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the list' })
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
