const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const users = require('./routes/users')
const transactions = require('./routes/transactions')
const accounts = require('./routes/accounts')
const budgets = require('./routes/budgets')

const app = express()

const port = process.env.PORT || 3030

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)

app.use('/', routes)
app.use('/users', users)
app.use('/transactions', transactions)
app.use('/accounts', accounts)
app.use('/budgets', budgets)

app.listen(port, () => console.log(`Example app listening on port: ${port}`))
