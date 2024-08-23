import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
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
  ) {
    const existList = await this.listService.existList(listId);

    if (!existList) {
      throw new NotFoundException('List not found');
    }

    return this.listItemService.createListItem(listId, createListItemDto);
  }

  @Post(':id/done')
  async markListItemAsDone(@Param('id') id: number) {
    const existListItem = await this.listItemService.existListItem(id);

    if (!existListItem) {
      throw new NotFoundException('List item not found');
    }

    return this.listItemService.markListItemAsDone(id);
  }

  @Post(':id/undone')
  async markListItemAsUndone(@Param('id') id: number) {
    const existListItem = await this.listItemService.existListItem(id);

    if (!existListItem) {
      throw new NotFoundException('List item not found');
    }

    return this.listItemService.markListItemAsUndone(id);
  }

  @Put(':id')
  async updateListItem(
    @Param('id') id: number,
    @Body() updateListItemDto: CreateListItemDto,
  ) {
    const existListItem = await this.listItemService.existListItem(id);

    if (!existListItem) {
      throw new NotFoundException('List item not found');
    }

    return this.listItemService.updateListItem(id, updateListItemDto);
  }

  @Delete(':id')
  async deleteListItem(@Param('id') id: number) {
    const existListItem = await this.listItemService.existListItem(id);

    if (!existListItem) {
      throw new NotFoundException('List item not found');
    }

    return this.listItemService.deleteListItem(id);
  }
}
