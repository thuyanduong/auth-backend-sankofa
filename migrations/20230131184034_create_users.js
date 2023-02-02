//Create our users table via code

exports.up = function(knex) {
  //create our table and cols
  return knex.schema.createTable('users', function (table) {
    table.increments().primary();
    table.string('username');
    table.string('bio');
    table.string('password');
  })
};


exports.down = function(knex) {
  //delete our table
  return knex.schema.dropTableIfExists('users')
};
