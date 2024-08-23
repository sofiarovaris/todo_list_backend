import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import List from 'src/entities/list.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    private readonly userService: UserService,
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
    await this.listRepository.delete({ id });
  }

  async getLists(): Promise<List[]> {
    return await this.listRepository.find({
      relations: ['items'],
    });
  }

  async existList(id: number): Promise<boolean> {
    return await this.listRepository.exists({
      where: { id },
    });
  }
}
