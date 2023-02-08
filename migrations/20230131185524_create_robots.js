/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('robots', function (table) {
    table.increments('id').primary();
    table.string('robot_name').notNullable();
    table.integer('hp').notNullable();
    table.integer('level').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('robots')
};
