/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('lists').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('lists', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('color').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table
          .foreign('user_id', 'user_id_fk')
          .references('id')
          .inTable('users');
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('lists');
};
