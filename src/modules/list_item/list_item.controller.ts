import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ListItemService } from './list_item.service';
import { CreateListItemDto } from './dto/create-item-dto';
import { ListService } from '../list/list.service';

@Controller('list_items')
export class ListItemController {
  constructor(
    private readonly listItemService: ListItemService,
    private readonly listService: ListService,
  ) {}

  @Post(':listId')
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
      throw new NotFoundException(
        'Trying to create list item for another user list',
      );
    }

    return await this.listItemService.createListItem(listId, createListItemDto);
  }

  @Put(':id/done')
  async markListItemAsDone(@Param('id') id: number, @Req() req) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new NotFoundException(
        'Trying to mark list item as done for another user list',
      );
    }

    return await this.listItemService.markListItemAsDone(id);
  }

  @Put(':id/undone')
  async markListItemAsUndone(@Param('id') id: number, @Req() req) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new NotFoundException(
        'Trying to mark list item as undone for another user list',
      );
    }

    return this.listItemService.markListItemAsUndone(id);
  }

  @Put(':id')
  async updateListItem(
    @Param('id') id: number,
    @Body() updateListItemDto: CreateListItemDto,
    @Req() req,
  ) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new NotFoundException(
        'Trying to update list item for another user list',
      );
    }

    return this.listItemService.updateListItem(id, updateListItemDto);
  }

  @Delete(':id')
  async deleteListItem(@Param('id') id: number, @Req() req) {
    const listItem = await this.listItemService.getListItemById(id);

    if (!listItem) {
      throw new NotFoundException('List item not found');
    }

    if (req.user.id !== listItem.list.user.id) {
      throw new NotFoundException(
        'Trying to delete list item for another user list',
      );
    }

    return this.listItemService.deleteListItem(id);
  }
}
