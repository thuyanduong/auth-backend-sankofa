const { Pool } = require('pg')

const connectionLocal = {
  user: 'postgres',
  host: 'localhost',
  database: 'robotworkshop',
  password: 'postgres',
  port: 5432,
}

const connectionProduction = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {rejectUnauthorized: false}
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionLocal)

module.exports = pool
//pool.query("SELECT * FROM robots;")