const axios = require('axios')

axios.defaults.baseURL = process.env.DB_URL
axios.defaults.headers.common.Authorization = `Bearer ${process.env.API_TOKEN}`

module.exports = {
  postUser: (url, payload) => axios.post(url, payload),
  getUsers: url => axios.get(url),
}
