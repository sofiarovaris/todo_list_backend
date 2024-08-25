import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import List from '../../entities/list.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import ListItem from '../../entities/list_item.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {}

  /**
   * Creates a new list for a user.
   * @param userId - The ID of the user creating the list.
   * @param createListDto - The data transfer object containing the details of the list.
   * @returns The created list.
   */
  async createList(userId: number, createListDto: CreateListDto) {
    const list = this.listRepository.create({
      ...createListDto,
      user: {
        id: userId,
      },
    });

    return await this.listRepository.save(list);
  }

  /**
   * Updates an existing list.
   * @param id - The ID of the list to update.
   * @param updateListDto - The data transfer object containing the updated details of the list.
   * @returns The updated list.
   */
  async updateList(id: number, updateListDto: UpdateListDto) {
    const list = await this.listRepository.findOneBy({ id });

    return await this.listRepository.save({
      ...list,
      ...updateListDto,
    });
  }

  /**
   * Deletes a list by its ID, along with its associated items.
   * @param id - The ID of the list to delete.
   * @returns The result of the delete operation.
   */
  async deleteList(id: number) {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    const deleteItemPromises = list.items.map(async (item) => {
      return this.listItemRepository.delete({ id: item.id });
    });

    await Promise.all(deleteItemPromises);

    return await this.listRepository.delete({ id });
  }

  /**
   * Retrieves all lists for a specific user.
   * @param userId - The ID of the user whose lists to retrieve.
   * @returns An array of lists belonging to the user.
   */
  async getListsByUser(userId: number) {
    return await this.listRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['items'],
    });
  }

  /**
   * Checks if a list exists by its ID.
   * @param id - The ID of the list to check.
   * @returns A boolean indicating whether the list exists.
   */
  async existList(id: number) {
    return await this.listRepository.exists({
      where: { id },
    });
  }

  /**
   * Retrieves a list by its ID.
   * @param id - The ID of the list to retrieve.
   * @returns The list with its associated user.
   */
  async getListById(id: number) {
    return await this.listRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
