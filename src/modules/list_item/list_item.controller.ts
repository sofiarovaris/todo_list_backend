import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ListItemService } from './list_item.service';
import { CreateListItemDto } from './dto/create-item-dto';
import { ListService } from '../list/list.service';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateListItemDto } from './dto/update-item-dto';

@ApiTags('list_items')
@Controller('list_items')
export class ListItemController {
  constructor(
    private readonly listItemService: ListItemService,
    private readonly listService: ListService,
  ) {}

  @Post(':listId')
  @ApiCreatedResponse({ description: 'Create list item' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @ApiForbiddenResponse({
    description: 'Trying to create list item for another user list',
  })
  @ApiParam({ name: 'listId', type: Number, description: 'ID of the list' })
  @ApiBody({ type: CreateListItemDto })
  async createListItem(
    @Param('listId') listId: number,
    @Body() createListItemDto: CreateListItemDto,
    @Req() req,
  ) {
    const list = await this.listService.getListById(listId);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    if (req.user.id !== list.user.id) {
      throw new ForbiddenException(
        'Trying to create list item for another user list',
      );
    }

    return await this.listItemService.createListItem(listId, createListItemDto);
  }

  @Put(':id/done')
  @ApiOkResponse({ description: 'Mark list item as done' })
  @ApiNotFoundResponse({ description: 'List item not found' })
  @ApiForbiddenResponse({
    description: 'Trying to mark list item as done for another user list',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the list item' })
  async markListItemAsDone(@Param('id') id: number, @Req() req) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new ForbiddenException(
        'Trying to mark list item as done for another user list',
      );
    }

    return await this.listItemService.markListItemAsDone(id);
  }

  @Put(':id/undone')
  @ApiOkResponse({ description: 'Mark list item as undone' })
  @ApiNotFoundResponse({ description: 'List item not found' })
  @ApiForbiddenResponse({
    description: 'Trying to mark list item as undone for another user list',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the list item' })
  async markListItemAsUndone(@Param('id') id: number, @Req() req) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new ForbiddenException(
        'Trying to mark list item as undone for another user list',
      );
    }

    return this.listItemService.markListItemAsUndone(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update list item' })
  @ApiNotFoundResponse({ description: 'List item not found' })
  @ApiForbiddenResponse({
    description: 'Trying to update list item for another user list',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the list item' })
  @ApiBody({ type: UpdateListItemDto })
  async updateListItem(
    @Param('id') id: number,
    @Body() updateListItemDto: UpdateListItemDto,
    @Req() req,
  ) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new ForbiddenException(
        'Trying to update list item for another user list',
      );
    }

    return this.listItemService.updateListItem(id, updateListItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete list item' })
  @ApiNotFoundResponse({ description: 'List item not found' })
  @ApiForbiddenResponse({
    description: 'Trying to delete list item for another user list',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the list item' })
  async deleteListItem(@Param('id') id: number, @Req() req) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new ForbiddenException(
        'Trying to delete list item for another user list',
      );
    }

    return this.listItemService.deleteListItem(id);
  }
}
