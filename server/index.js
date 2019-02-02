const express = require('express')
const routes = require('./routes/index')
const users = require('./routes/users')
const app = express()

const port = 3030

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)
app.use('/users', users)

app.listen(port, () => console.log(`Example app listening on port: ${port}`))
