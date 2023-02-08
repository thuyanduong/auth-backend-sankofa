/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require("bcrypt")

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('users').del()
  // await knex('robots').del()
  // await knex('user_robots').del()
  await knex.raw('TRUNCATE TABLE user_robots RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE robots RESTART IDENTITY CASCADE')

  await knex('users').insert([
    {username: 'caston', bio: 'My name is Caston!', password: bcrypt.hashSync('123', 10)},
    {username: 'jowel', bio: 'I am Jowel!', password: bcrypt.hashSync('456', 10)},
    {username: 'ana', bio: 'Ana here!', password: bcrypt.hashSync('789', 10)}
  ]);

  await knex('robots').insert([
    {robot_name: 'Optimus Prime', hp: 100, level: 10},
    {robot_name: 'Megatron', hp: 110, level: 11},
    {robot_name: 'Dr. Robot', hp: 120, level: 12},
    {robot_name: 'Tron', hp: 130, level: 13},
    {robot_name: 'RoboTractor', hp: 140, level: 14},
    {robot_name: 'Full Metal Alchemist', hp: 150, level: 15},
    {robot_name: 'Invader', hp: 160, level: 16},
  ]);
  
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
};
