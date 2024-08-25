import { USER_EXAMPLE } from '../../../modules/user/tests/support-data';

export const CREATE_LIST_DTO_EXAMPLE = {
  name: 'Shopping List',
  color: '#000000',
};

export const LIST_EXAMPLE = {
  id: 1,
  name: 'Shopping List',
  color: '#000000',
  user: USER_EXAMPLE,
  items: [],
};

export const EDIT_LIST_DTO_EXAMPLE = {
  name: 'Shopping List 2',
  color: '#000FFF',
};

export const UPDATED_LIST_EXAMPLE = {
  id: 1,
  name: 'Shopping List2',
  color: '#000FFF',
  user: USER_EXAMPLE,
};
