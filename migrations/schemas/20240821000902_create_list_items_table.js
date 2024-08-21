/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('list_items').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('list_items', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.boolean('is_done').notNullable().defaultTo(false);
        table.integer('list_id').unsigned().notNullable();
        table
          .foreign('list_id', 'list_id_fk')
          .references('id')
          .inTable('lists');
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('list_items');
};
