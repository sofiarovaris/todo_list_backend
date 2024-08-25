import { Test, TestingModule } from '@nestjs/testing';
import { ListItemController } from './list_item.controller';
import { ListItemService } from './list_item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import ListItem from '../../entities/list_item.entity';
import { ListService } from '../list/list.service';
import List from '../../entities/list.entity';
import { LIST_EXAMPLE } from '../list/tests/support-data';
import {
  CREATE_LIST_ITEM_DTO_EXAMPLE,
  DONE_LIST_ITEM_EXAMPLE,
  LIST_ITEM_EXAMPLE,
  UPDATE_LIST_ITEM_DTO_EXAMPLE,
  UPDATED_LIST_ITEM_EXAMPLE,
} from './tests/support-data';
import { REQUEST_EXAMPLE } from '../user/tests/support-data';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('ListItemController', () => {
  let controller: ListItemController;
  let service: ListItemService;
  let listService: ListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListItemController],
      providers: [
        ListItemService,
        ListService,
        {
          provide: getRepositoryToken(ListItem),
          useValue: {},
        },
        {
          provide: getRepositoryToken(List),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ListItemController>(ListItemController);
    service = module.get<ListItemService>(ListItemService);
    listService = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(listService).toBeDefined();
  });

  it('should create a list item', async () => {
    jest
      .spyOn(listService, 'getListById')
      .mockResolvedValue(LIST_EXAMPLE as any);

    jest
      .spyOn(service, 'createListItem')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    const listItem = await controller.createListItem(
      1,
      CREATE_LIST_ITEM_DTO_EXAMPLE,
      REQUEST_EXAMPLE,
    );

    expect(listItem).toStrictEqual(LIST_ITEM_EXAMPLE);
  });

  it('should throw an error when list not found', async () => {
    jest.spyOn(listService, 'getListById').mockResolvedValue(null);

    try {
      await controller.createListItem(
        1,
        CREATE_LIST_ITEM_DTO_EXAMPLE,
        REQUEST_EXAMPLE,
      );

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error when user is not the list owner', async () => {
    jest
      .spyOn(listService, 'getListById')
      .mockResolvedValue(LIST_EXAMPLE as any);

    try {
      await controller.createListItem(1, CREATE_LIST_ITEM_DTO_EXAMPLE, {
        user: {
          id: 2,
        },
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should mark list item as done', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    jest
      .spyOn(service, 'markListItemAsDone')
      .mockResolvedValue(DONE_LIST_ITEM_EXAMPLE as any);

    const listItem = await controller.markListItemAsDone(1, REQUEST_EXAMPLE);

    expect(listItem).toStrictEqual(DONE_LIST_ITEM_EXAMPLE);
  });

  it('should throw an error when list item not found', async () => {
    jest.spyOn(service, 'getListItemById').mockResolvedValue(null);

    try {
      await controller.markListItemAsDone(1, REQUEST_EXAMPLE);

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error when user is not the list item owner', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    try {
      await controller.markListItemAsDone(1, {
        user: {
          id: 2,
        },
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should mark list item as undone', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(DONE_LIST_ITEM_EXAMPLE as any);

    jest
      .spyOn(service, 'markListItemAsUndone')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    const listItem = await controller.markListItemAsUndone(1, REQUEST_EXAMPLE);

    expect(listItem).toStrictEqual(LIST_ITEM_EXAMPLE);
  });

  it('should throw an error when list item not found', async () => {
    jest.spyOn(service, 'getListItemById').mockResolvedValue(null);

    try {
      await controller.markListItemAsUndone(1, REQUEST_EXAMPLE);

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error when user is not the list item owner', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    try {
      await controller.markListItemAsUndone(1, {
        user: {
          id: 2,
        },
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should update a list item', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    jest
      .spyOn(service, 'updateListItem')
      .mockResolvedValue(UPDATED_LIST_ITEM_EXAMPLE as any);

    const listItem = await controller.updateListItem(
      1,
      UPDATE_LIST_ITEM_DTO_EXAMPLE,
      REQUEST_EXAMPLE,
    );

    expect(listItem).toStrictEqual(UPDATED_LIST_ITEM_EXAMPLE);
  });

  it('should throw an error when list item not found', async () => {
    jest.spyOn(service, 'getListItemById').mockResolvedValue(null);

    try {
      await controller.updateListItem(
        1,
        UPDATE_LIST_ITEM_DTO_EXAMPLE,
        REQUEST_EXAMPLE,
      );

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error when user is not the list item owner', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    try {
      await controller.updateListItem(1, UPDATE_LIST_ITEM_DTO_EXAMPLE, {
        user: {
          id: 2,
        },
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should delete a list item', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    jest.spyOn(service, 'deleteListItem').mockResolvedValue({
      raw: [],
      affected: 1,
    });

    const listItem = await controller.deleteListItem(1, REQUEST_EXAMPLE);

    expect(listItem).toStrictEqual({
      raw: [],
      affected: 1,
    });
  });

  it('should throw an error when list item not found', async () => {
    jest.spyOn(service, 'getListItemById').mockResolvedValue(null);

    try {
      await controller.deleteListItem(1, REQUEST_EXAMPLE);

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw an error when user is not the list item owner', async () => {
    jest
      .spyOn(service, 'getListItemById')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    try {
      await controller.deleteListItem(1, {
        user: {
          id: 2,
        },
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
