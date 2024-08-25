import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import User from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  REQUEST_EXAMPLE,
  USER_WITHOUT_PASSWORD_EXAMPLE,
} from './tests/support-data';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return user without password that done the request', async () => {
    jest
      .spyOn(service, 'getUser')
      .mockResolvedValueOnce(USER_WITHOUT_PASSWORD_EXAMPLE as any);

    const user = await controller.getUser(REQUEST_EXAMPLE);

    expect(user).toEqual(USER_WITHOUT_PASSWORD_EXAMPLE);
  });
});
