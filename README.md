# Workshop: DB migrations and Seeds

### Review (5 min)
- What are database migrations?
- What are the benefits of database migrations?
- What does seeding your database do?

### Step X: Have your ERD in Hand! (5 min)
- [ERD](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1#G1nvP0HjgBdrqhqcMeShTi2SkIWInIZzmy)

### Step X: Start a Node/Express project (5 min)
- Create a node project using `npm init`
- What does that command do? 
- Code a little, test a little: How do we make sure it worked?

### Step X: Refresh ourselves on knex (5 min)
- `knex` to see a list of commands (If error, install knex globally using `npm install -g knex`)
- `knex init` to initilize knex (If error, install knex locally using `npm install knex`)
- What does that command do? How do we make sure it worked?

### Step X: Knex and DB Set up (5 min)
- We need to update `knexfile.js`
- Specficially, the `development` object
- Create your database (we'll use TablePlus as our UI)
- Create your database _connection_ by copying the `staging` object
- `npm install pg`
- What does that command do? How do we make sure it worked?

### Step 4: Creating the Migration files (5 min)
- Create our first migration file
- `knex migrate:make create_users`
- Reference the official [knex docs](https://knexjs.org/guide/schema-builder.html)
- Make sure to return a promise!

### Step 5: Writing the migration code (15 min)
- Create base tables first, then dependency tables afterwards. 

#### Step 5a:
- What does the code below do? What is the importance of the `increments()` and `primary()` methods?

```js
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments().primary();
    table.string('username');
    table.string('bio');
    table.string('password');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
```
- Code a little, test a little!
- How do we undo a migration?

#### Step 5b:
```js
exports.up = function(knex) {
  return knex.schema.createTable('robots', function (table) {
    table.increments().primary();
    table.string('robot_name');
    table.integer('hp');
    table.integer('level');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('robots')
};
```
- Again, code a little test a little!

#### Step 5c:
What's different about this migration?
```js
exports.up = function(knex) {
  return knex.schema.createTable('user_robots', function (table) {
    table.increments().primary();
    table.integer('user_id')
    table.integer('robot_id')
    table.foreign('user_id').references('id').inTable('users');
    table.foreign('robot_id').references('id').inTable('robots');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_robots')
};
```
- One last time, code a little, test a little

### Step 6: Writing the Seed file (15 min)
- `knex seed:make data`
- The order of in which populate the tables matters! Why?
- If you used `increment()`, then you don't need to insert primary keys (`id`)

#### Step 6a: Seeding Users

```js
  await knex('users').del()
  await knex('users').insert([
    {username: 'caston', bio: 'My name is Caston!', password: '123'},
    {username: 'jowel', bio: 'I am Jowel!', password: '456'},
    {username: 'ana', bio: 'Ana here!', password: '789'}
  ]);
```
- Code a little, test a little

#### Step 6b: Seeding Robots

```js
  await knex('robots').del()
  await knex('robots').insert([
    {robot_name: 'Optimus Prime', hp: 100, level: 10},
    {robot_name: 'Megatron', hp: 110, level: 11},
    {robot_name: 'Dr. Robot', hp: 120, level: 12},
    {robot_name: 'Tron', hp: 130, level: 13},
    {robot_name: 'RoboTractor', hp: 140, level: 14},
    {robot_name: 'Full Metal Alchemist', hp: 150, level: 15},
    {robot_name: 'Invader', hp: 160, level: 16},
  ]);
```
- Code a little, test a little

#### Step 6c: Seeding UserRobots

```js
  await knex('user_robots').del()
  await knex('user_robots').insert([
    {user_id: 1, robot_id: 1},
    {user_id: 1, robot_id: 2},
    {user_id: 1, robot_id: 3},
    {user_id: 1, robot_id: 4},
    {user_id: 2, robot_id: 1},
    {user_id: 2, robot_id: 5},
    {user_id: 2, robot_id: 6},
    {user_id: 2, robot_id: 7},
    {user_id: 3, robot_id: 1},
    {user_id: 3, robot_id: 3},
    {user_id: 3, robot_id: 5},
    {user_id: 3, robot_id: 7},
  ]);
```
- Code a little, test a little!
- OH NO! An error!

#### Step 6d: Refactor 
- When we delete our data, we should also reset the increment to start back at 1!
- If you used `primary()`, this next SQL command will know to `RESTART IDENTITY`!
- `CASCADE` gets rid of dependency issues!

```js
  await knex.raw('TRUNCATE TABLE user_robots RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE robots RESTART IDENTITY CASCADE')
```

### Step 7: Summary (5 min)
- To reset or change your database
  - Run `knex migrate:rollback` until you are at the base migration
  - Then make changes to your migration files
  - Run `knex migrate:latest` to spin up your schema 
  - Run `knex seed:run` to populate your data

- To re-seed your database
  - Run `knex seed:run`