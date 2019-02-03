const path = require('path')

require('dotenv').config()

const { POSTGRES_URL_DEV, POSTGRES_URI } = process.env

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
    connection: `${POSTGRES_URI}`,
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
  },
}
