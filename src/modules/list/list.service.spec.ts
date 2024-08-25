import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import List from '../../entities/list.entity';
import { mockRepository } from '../../utils/mockRepository';
import { getRepositoryToken } from '@nestjs/typeorm';
import ListItem from '../../entities/list_item.entity';
import { Repository } from 'typeorm';
import {
  CREATE_LIST_DTO_EXAMPLE,
  EDIT_LIST_DTO_EXAMPLE,
  LIST_EXAMPLE,
  UPDATED_LIST_EXAMPLE,
} from './tests/support-data';
import { USER_EXAMPLE } from '../user/tests/support-data';

describe('ListService', () => {
  let service: ListService;
  let repository: Repository<List>;
  let listItemRepository: Repository<ListItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        {
          provide: getRepositoryToken(List),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(ListItem),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ListService>(ListService);
    repository = module.get<Repository<List>>(getRepositoryToken(List));
    listItemRepository = module.get<Repository<ListItem>>(
      getRepositoryToken(ListItem),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(listItemRepository).toBeDefined();
  });

  it('should create a list', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(LIST_EXAMPLE as any);

    jest.spyOn(repository, 'save').mockResolvedValue(LIST_EXAMPLE as any);

    const list = await service.createList(
      USER_EXAMPLE.id,
      CREATE_LIST_DTO_EXAMPLE as any,
    );

    expect(list).toStrictEqual(LIST_EXAMPLE);
  });

  it('should update a list', async () => {
    jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValue(UPDATED_LIST_EXAMPLE as any);

    jest
      .spyOn(repository, 'save')
      .mockResolvedValue(UPDATED_LIST_EXAMPLE as any);

    const list = await service.updateList(
      USER_EXAMPLE.id,
      EDIT_LIST_DTO_EXAMPLE as any,
    );

    expect(list).toStrictEqual(UPDATED_LIST_EXAMPLE);
  });

  it('should delete a list', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(LIST_EXAMPLE as any);

    jest.spyOn(listItemRepository, 'delete').mockResolvedValue({
      raw: [],
      affected: 1,
    } as any);

    jest.spyOn(repository, 'delete').mockResolvedValue({
      raw: [],
      affected: 1,
    } as any);

    const result = await service.deleteList(LIST_EXAMPLE.id);

    expect(result).toStrictEqual({
      raw: [],
      affected: 1,
    });
  });

  it('should get lists by user', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([LIST_EXAMPLE] as any);

    const lists = await service.getListsByUser(USER_EXAMPLE.id);

    expect(lists).toStrictEqual([LIST_EXAMPLE]);
  });

  it('should return true if list exists', async () => {
    jest.spyOn(repository, 'exists').mockResolvedValue(true);

    const exists = await service.existList(LIST_EXAMPLE.id);

    expect(exists).toBe(true);
  });

  it('should return false if list does not exist', async () => {
    jest.spyOn(repository, 'exists').mockResolvedValue(false);

    const exists = await service.existList(2);

    expect(exists).toBe(false);
  });

  it('should get list by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(LIST_EXAMPLE as any);

    const list = await service.getListById(LIST_EXAMPLE.id);

    expect(list).toStrictEqual(LIST_EXAMPLE);
  });
});
