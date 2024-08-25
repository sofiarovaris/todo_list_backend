import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns An object containing the user's id, email, and name.
   */
  async getUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  /**
   * Checks if a user exists by their ID.
   * @param id - The ID of the user to check.
   * @returns A boolean indicating whether the user exists.
   */
  async existUser(id: number) {
    return await this.userRepository.exists({
      where: { id },
    });
  }

  /**
   * Finds a user by their email.
   * @param email - The email of the user to find.
   * @returns The user entity if found, otherwise null.
   */
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
