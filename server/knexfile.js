const path = require('path')
const { POSTGRES_URL_DEV, POSTGRES_URI } = process.env

module.exports = {
  development: {
    client: 'postgresql',
    connection: `${POSTGRES_URL_DEV}`,
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
  },
  production: {
    client: 'postgresql',
    connection: `${POSTGRES_URI}`,
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
  },
}
