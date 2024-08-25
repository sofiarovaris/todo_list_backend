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

  async createList(userId: number, createListDto: CreateListDto) {
    const list = this.listRepository.create({
      ...createListDto,
      user: {
        id: userId,
      },
    });

    return await this.listRepository.save(list);
  }

  async updateList(id: number, updateListDto: UpdateListDto) {
    const list = await this.listRepository.findOneBy({ id });

    return await this.listRepository.save({
      ...list,
      ...updateListDto,
    });
  }

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

  async getListsByUser(userId: number): Promise<List[]> {
    return await this.listRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['items'],
    });
  }

  async existList(id: number): Promise<boolean> {
    return await this.listRepository.exists({
      where: { id },
    });
  }

  async getListById(id: number): Promise<List> {
    return await this.listRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
