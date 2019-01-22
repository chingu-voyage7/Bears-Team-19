const express = require('express')
const path = require('path')
require('dotenv').config({
  path: process.cwd().endsWith('server')
    ? '.env'
    : path.resolve(process.cwd(), 'server', '.env'),
})
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const users = require('./routes/users')
const expenses = require('./routes/expenses')
const incomes = require('./routes/incomes')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', routes)
app.use('/users', users)
app.use('/expenses', expenses)
app.use('/incomes', incomes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err,
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {},
  })
})

module.exports = app
