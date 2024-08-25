import { LIST_EXAMPLE } from '../../../modules/list/tests/support-data';

export const CREATE_LIST_ITEM_DTO_EXAMPLE = {
  name: 'Banana',
};

export const LIST_ITEM_EXAMPLE = {
  id: 1,
  name: 'Banana',
  is_done: false,
  list: {
    ...LIST_EXAMPLE,
  },
};

export const UPDATE_LIST_ITEM_DTO_EXAMPLE = {
  name: 'Apple',
};

export const UPDATED_LIST_ITEM_EXAMPLE = {
  id: 1,
  name: 'Apple',
  is_done: false,
};

export const DONE_LIST_ITEM_EXAMPLE = {
  id: 1,
  name: 'Banana',
  is_done: true,
  list: {
    ...LIST_EXAMPLE,
  },
};
