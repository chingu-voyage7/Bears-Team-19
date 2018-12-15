const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const client = require('../client')

require('../config/passport')(passport)

const router = express.Router()
const db = [1, 2, 3]
const encryptPassword = (password, saltRounds = 7) =>
  bcrypt.hashSync(password, saltRounds)
const errorHandler = error => {
  const errObject = {}
  if (error.response) {
    errObject.status = error.response.status
    errObject.statusText = error.response.statusText
  }
  return errObject
}

router.get(
  '/profile/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(db)
  },
)

router.get('/', (req, res) => {
  client
    .getUsers('/users')
    .then(result => res.json(result.data))
    .catch(error => res.json(errorHandler(error)))
})

router.post('/signup', (req, res) => {
  const { email, name, username, password } = req.body
  const encryptedPassword = encryptPassword(password)
  const details = { email, name, username }
  client
    .postUser('/users', details)
    .then(result => res.json(result))
    .catch(error => res.json(errorHandler(error)))
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body
  client
    .getUsers('/users')
    .then(result => {
      const user = result.data.filter(item => item.email === email)[0]
      const isValid = user
        ? bcrypt.compareSync(password, user.encryptedPassword)
        : false

      if (isValid) {
        const token = jwt.sign(
          { email: user.email, name: user.name, id: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn: 86400 * 7 },
        )
        res.json(token)
      } else {
        res.status(400).json({ msg: `Wrong credentials!` })
      }
    })
    .catch(error => res.json(errorHandler(error)))
})

module.exports = router
