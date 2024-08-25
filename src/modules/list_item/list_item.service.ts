import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ListItem from '../../entities/list_item.entity';
import { Repository } from 'typeorm';
import { CreateListItemDto } from './dto/create-item-dto';
import { UpdateListItemDto } from './dto/update-item-dto';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {}

  /**
   * Creates a new list item.
   * @param listId - The ID of the list to which the item belongs.
   * @param listItemDto - The data transfer object containing the details of the list item.
   * @returns The created list item.
   */
  async createListItem(listId: number, listItemDto: CreateListItemDto) {
    const listItem = this.listItemRepository.create({
      ...listItemDto,
      list: {
        id: listId,
      },
    });

    return await this.listItemRepository.save(listItem);
  }

  /**
   * Updates an existing list item.
   * @param id - The ID of the list item to update.
   * @param updateListItemDto - The data transfer object containing the updated details of the list item.
   * @returns The updated list item.
   */
  async updateListItem(id: number, updateListItemDto: UpdateListItemDto) {
    const listItem = await this.listItemRepository.findOneBy({ id });

    return await this.listItemRepository.save({
      ...listItem,
      ...updateListItemDto,
    });
  }

  /**
   * Deletes a list item by its ID.
   * @param id - The ID of the list item to delete.
   * @returns The result of the delete operation.
   */
  async deleteListItem(id: number) {
    return await this.listItemRepository.delete({ id });
  }

  /**
   * Checks if a list item exists by its ID.
   * @param id - The ID of the list item to check.
   * @returns A boolean indicating whether the list item exists.
   */
  async existListItem(id: number) {
    return await this.listItemRepository.exists({
      where: { id },
    });
  }

  /**
   * Marks a list item as done.
   * @param id - The ID of the list item to mark as done.
   * @returns The updated list item with the is_done flag set to true.
   */
  async markListItemAsDone(id: number) {
    const listItem = await this.listItemRepository.findOneBy({ id });

    return await this.listItemRepository.save({
      ...listItem,
      is_done: true,
    });
  }

  /**
   * Marks a list item as undone.
   * @param id - The ID of the list item to mark as undone.
   * @returns The updated list item with the is_done flag set to false.
   */
  async markListItemAsUndone(id: number) {
    const listItem = await this.listItemRepository.findOneBy({ id });

    return await this.listItemRepository.save({
      ...listItem,
      is_done: false,
    });
  }

  /**
   * Retrieves a list item by its ID.
   * @param id - The ID of the list item to retrieve.
   * @returns The list item with its associated list and user.
   */
  async getListItemById(id: number) {
    return await this.listItemRepository.findOne({
      where: { id },
      relations: ['list.user'],
    });
  }
}
