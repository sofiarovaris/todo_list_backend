import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async existUser(id: number): Promise<boolean> {
    return await this.userRepository.exists({
      where: { id },
    });
  }
}
