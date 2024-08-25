import { Test, TestingModule } from '@nestjs/testing';
import { ListItemService } from './list_item.service';
import ListItem from '../../entities/list_item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../../utils/mockRepository';
import { USER_EXAMPLE } from '../user/tests/support-data';
import { Repository } from 'typeorm';
import {
  CREATE_LIST_ITEM_DTO_EXAMPLE,
  DONE_LIST_ITEM_EXAMPLE,
  LIST_ITEM_EXAMPLE,
  UPDATE_LIST_ITEM_DTO_EXAMPLE,
} from './tests/support-data';
import { LIST_EXAMPLE, UPDATED_LIST_EXAMPLE } from '../list/tests/support-data';

describe('ListItemService', () => {
  let service: ListItemService;
  let repository: Repository<ListItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListItemService,
        {
          provide: getRepositoryToken(ListItem),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ListItemService>(ListItemService);
    repository = module.get<Repository<ListItem>>(getRepositoryToken(ListItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('shoud create a list item', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(LIST_ITEM_EXAMPLE as any);

    jest.spyOn(repository, 'save').mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    const listItem = await service.createListItem(
      LIST_ITEM_EXAMPLE.id,
      CREATE_LIST_ITEM_DTO_EXAMPLE as any,
    );

    expect(listItem).toStrictEqual(LIST_ITEM_EXAMPLE);
  });

  it('should update a list item', async () => {
    jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    jest
      .spyOn(repository, 'save')
      .mockResolvedValue(UPDATED_LIST_EXAMPLE as any);

    const listItem = await service.updateListItem(
      LIST_ITEM_EXAMPLE.id,
      UPDATE_LIST_ITEM_DTO_EXAMPLE as any,
    );

    expect(listItem).toStrictEqual(UPDATED_LIST_EXAMPLE);
  });

  it('should delete a list item', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({
      raw: [],
      affected: 1,
    });

    const listItem = await service.deleteListItem(LIST_ITEM_EXAMPLE.id);

    expect(listItem).toStrictEqual({
      raw: [],
      affected: 1,
    });
  });

  it('should exist a list item', async () => {
    jest.spyOn(repository, 'exists').mockResolvedValue(true);

    const exist = await service.existListItem(LIST_ITEM_EXAMPLE.id);

    expect(exist).toBeTruthy();
  });

  it('should mark a list item as done', async () => {
    jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    jest
      .spyOn(repository, 'save')
      .mockResolvedValue(DONE_LIST_ITEM_EXAMPLE as any);

    const listItem = await service.markListItemAsDone(LIST_ITEM_EXAMPLE.id);

    expect(listItem).toStrictEqual(DONE_LIST_ITEM_EXAMPLE);
    expect(listItem.is_done).toBeTruthy();
  });

  it('should mark a list item as undone', async () => {
    jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValue(DONE_LIST_ITEM_EXAMPLE as any);

    jest.spyOn(repository, 'save').mockResolvedValue(LIST_ITEM_EXAMPLE as any);

    const listItem = await service.markListItemAsUndone(
      DONE_LIST_ITEM_EXAMPLE.id,
    );

    expect(listItem).toStrictEqual(LIST_ITEM_EXAMPLE);
    expect(listItem.is_done).toBeFalsy();
  });

  it('should get a list item by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue({
      ...LIST_ITEM_EXAMPLE,
      list: {
        ...LIST_EXAMPLE,
      },
    } as any);

    const listItem = await service.getListItemById(LIST_ITEM_EXAMPLE.id);

    expect(listItem).toStrictEqual({
      ...LIST_ITEM_EXAMPLE,
      list: {
        ...LIST_EXAMPLE,
      },
    });
  });
});
