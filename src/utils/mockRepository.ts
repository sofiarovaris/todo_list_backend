export class mockRepository {
  static create = jest.fn();
  static save = jest.fn();
  static find = jest.fn();
  static findOne = jest.fn();
  static findOneBy = jest.fn();
  static delete = jest.fn();
  static update = jest.fn();
  static exists = jest.fn();
}
