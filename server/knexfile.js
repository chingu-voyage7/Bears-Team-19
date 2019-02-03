const path = require('path')

require('dotenv').config()

const { POSTGRES_URL_DEV, DATABASE_URL } = process.env

console.log(process.env, 'Process.env')
console.log('URLS: ', POSTGRES_URL_DEV, DATABASE_URL)
module.exports = {
  development: {
    client: 'pg',
    connection: `${POSTGRES_URL_DEV}`,
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
  },
  production: {
    client: 'pg',
    connection: `${DATABASE_URL}`,
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
    ssl: true,
  },
}
