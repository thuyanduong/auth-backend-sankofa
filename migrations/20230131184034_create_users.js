//Create our users table via code

exports.up = function(knex) {
  //create our table and cols
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('bio');
    table.string('password').notNullable();
  })
};


exports.down = function(knex) {
  //delete our table
  return knex.schema.dropTableIfExists('users')
};
