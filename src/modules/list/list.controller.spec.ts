import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import List from '../../entities/list.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import ListItem from '../../entities/list_item.entity';
import { UserService } from '../user/user.service';
import User from '../../entities/user.entity';
import {
  CREATE_LIST_DTO_EXAMPLE,
  EDIT_LIST_DTO_EXAMPLE,
  LIST_EXAMPLE,
  UPDATED_LIST_EXAMPLE,
} from './tests/support-data';
import { REQUEST_EXAMPLE } from '../user/tests/support-data';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('ListController', () => {
  let controller: ListController;
  let service: ListService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [
        ListService,
        UserService,
        {
          provide: getRepositoryToken(List),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ListItem),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ListController>(ListController);
    service = module.get<ListService>(ListService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should create a list', async () => {
    jest.spyOn(userService, 'existUser').mockResolvedValue(true);

    jest.spyOn(service, 'createList').mockResolvedValue(LIST_EXAMPLE as any);

    const list = await controller.createList(
      { userId: 1 },
      CREATE_LIST_DTO_EXAMPLE,
      REQUEST_EXAMPLE,
    );

    expect(list).toStrictEqual(LIST_EXAMPLE);
  });

  it('should throw an error if user does not exist', async () => {
    jest.spyOn(userService, 'existUser').mockResolvedValue(false);

    try {
      await controller.createList(
        { userId: 1 },
        CREATE_LIST_DTO_EXAMPLE,
        REQUEST_EXAMPLE,
      );

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error if user is not the same as the request user', async () => {
    jest.spyOn(userService, 'existUser').mockResolvedValue(true);

    try {
      await controller.createList(
        { userId: 2 },
        CREATE_LIST_DTO_EXAMPLE,
        REQUEST_EXAMPLE,
      );

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should update a list', async () => {
    jest.spyOn(service, 'getListById').mockResolvedValue(LIST_EXAMPLE as any);

    jest
      .spyOn(service, 'updateList')
      .mockResolvedValue(UPDATED_LIST_EXAMPLE as any);

    const list = await controller.updateList(
      { id: 1 },
      EDIT_LIST_DTO_EXAMPLE,
      REQUEST_EXAMPLE,
    );

    expect(list).toStrictEqual(UPDATED_LIST_EXAMPLE);
  });

  it('should throw an error if list to update does not exist', async () => {
    jest.spyOn(service, 'getListById').mockResolvedValue(null as any);

    try {
      await controller.updateList(
        { id: 2 },
        EDIT_LIST_DTO_EXAMPLE,
        REQUEST_EXAMPLE,
      );

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error if user is not the same as the list user', async () => {
    jest.spyOn(service, 'getListById').mockResolvedValue(LIST_EXAMPLE as any);

    try {
      await controller.updateList({ id: 1 }, EDIT_LIST_DTO_EXAMPLE, {
        user: { id: 2 },
      });

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should get user lists', async () => {
    jest.spyOn(userService, 'existUser').mockResolvedValue(true as any);

    jest
      .spyOn(service, 'getListsByUser')
      .mockResolvedValue([LIST_EXAMPLE] as any);

    const list = await controller.getListsByUser(
      { userId: 1 },
      REQUEST_EXAMPLE,
    );

    expect(list).toStrictEqual([LIST_EXAMPLE]);
  });

  it('should throw an error if list to update does not exist', async () => {
    jest.spyOn(userService, 'existUser').mockResolvedValue(null as any);

    try {
      await controller.getListsByUser({ userId: 2 }, REQUEST_EXAMPLE);

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error if user is not the same as the list user', async () => {
    jest.spyOn(userService, 'existUser').mockResolvedValue(true as any);

    jest.spyOn(service, 'getListById').mockResolvedValue(LIST_EXAMPLE as any);

    try {
      await controller.getListsByUser(
        { userId: 1 },
        {
          user: { id: 2 },
        },
      );

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should delete a list', async () => {
    jest.spyOn(service, 'getListById').mockResolvedValue(LIST_EXAMPLE as any);

    jest.spyOn(service, 'deleteList').mockResolvedValue({
      raw: [],
      affected: 1,
    } as any);

    const list = await controller.deleteList({ id: 1 }, REQUEST_EXAMPLE);

    expect(list).toStrictEqual({
      raw: [],
      affected: 1,
    });
  });

  it('should throw an error if list to delete does not exist', async () => {
    jest.spyOn(service, 'getListById').mockResolvedValue(null as any);

    try {
      await controller.deleteList({ id: 2 }, REQUEST_EXAMPLE);

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error if user is not the same as the list user', async () => {
    jest.spyOn(service, 'getListById').mockResolvedValue(LIST_EXAMPLE as any);

    try {
      await controller.deleteList({ id: 1 }, { user: { id: 2 } });

      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });
});
