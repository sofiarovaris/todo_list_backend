import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import User from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../../utils/mockRepository';
import {
  USER_EXAMPLE,
  USER_WITHOUT_PASSWORD_EXAMPLE,
} from './tests/support-data';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return a user without password', async () => {
    jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValueOnce(USER_WITHOUT_PASSWORD_EXAMPLE as any);

    const user = await service.getUser(1);

    expect(user).toStrictEqual(USER_WITHOUT_PASSWORD_EXAMPLE);
  });

  it('should return true if user exists', async () => {
    jest.spyOn(repository, 'exists').mockResolvedValueOnce(true);

    const exists = await service.existUser(1);

    expect(exists).toBe(true);
  });

  it('should return false if user does not exist', async () => {
    jest.spyOn(repository, 'exists').mockResolvedValueOnce(false);

    const exists = await service.existUser(2);

    expect(exists).toBe(false);
  });

  it('should find a user by email', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValueOnce(USER_EXAMPLE as any);

    const user = await service.findByEmail(USER_EXAMPLE.email);

    expect(user).toStrictEqual(USER_EXAMPLE);
  });
});
