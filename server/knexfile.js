const path = require('path')

module.exports = {
  development: {
    client: 'postgresql', // Ensure you specify your particular client here
    connection: `postgres://postgres:password@192.168.99.100:5432/bear19`, // Make sure to use your specific db connection here.
    migrations: {
      directory: path.join(__dirname, '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/seeds'),
    },
  },
}
