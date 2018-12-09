const axios = require('axios')

axios.defaults.baseURL = process.env.DB_URL

module.exports = {
  postUser: (url, payload) => axios.post(url, payload),
  getUsers: url => axios.get(url),
}
