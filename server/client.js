const axios = require('axios')

axios.defaults.baseURL = process.env.DB_URL
axios.defaults.headers.common.Authorization = `Bearer ${process.env.API_TOKEN}`

module.exports = {
  postUser: (url, payload) => axios.post(url, payload),
  getUsers: url => axios.get(url),
  postIncome: (url, payload) => axios.post(url, payload),
  postExpense: (url, payload) => axios.post(url, payload),
  getIncome: url => axios.get(url),
  getExpense: url => axios.get(url),
  deleteExpense: url => axios.delete(url),
  deleteIncome: url => axios.delete(url),
  updateIncome: (url, payload) => axios.patch(url, payload),
  updateExpense: (url, payload) => axios.patch(url, payload),
}
