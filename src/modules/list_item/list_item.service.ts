import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ListItem from 'src/entities/list_item.entity';
import { Repository } from 'typeorm';
import { CreateListItemDto } from './dto/create-item-dto';
import { UpdateListItemDto } from './dto/update-item-dto';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
    // private readonly userService: UserService,
  ) {}

  async createListItem(
    listId: number,
    listItemDto: CreateListItemDto,
  ): Promise<ListItem> {
    const listItem = this.listItemRepository.create({
      ...listItemDto,
      list: {
        id: listId,
      },
    });

    return await this.listItemRepository.save(listItem);
  }

  async updateListItem(
    id: number,
    updateListItemDto: UpdateListItemDto,
  ): Promise<ListItem> {
    const listItem = await this.listItemRepository.findOneBy({ id });

    return await this.listItemRepository.save({
      ...listItem,
      ...updateListItemDto,
    });
  }

  async deleteListItem(id: number): Promise<void> {
    await this.listItemRepository.delete({ id });
  }

  async existListItem(id: number): Promise<boolean> {
    return await this.listItemRepository.exists({
      where: { id },
    });
  }

  async markListItemAsDone(id: number): Promise<ListItem> {
    const listItem = await this.listItemRepository.findOneBy({ id });

    return await this.listItemRepository.save({
      ...listItem,
      is_done: true,
    });
  }

  async markListItemAsUndone(id: number): Promise<ListItem> {
    const listItem = await this.listItemRepository.findOneBy({ id });

    return await this.listItemRepository.save({
      ...listItem,
      is_done: false,
    });
  }

  async getListItemById(id: number): Promise<ListItem> {
    return await this.listItemRepository.findOne({
      where: { id },
      relations: ['list.user'],
    });
  }
}
