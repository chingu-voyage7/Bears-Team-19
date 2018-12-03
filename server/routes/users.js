const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const db = []

const encryptPassword = password => bcrypt.hashSync(password)

/* GET users listing. */
router.get('/profile/:id', (req, res) => {
  res.json(db)
})

router.post('/signup', (req, res) => {
  const { email, name, password } = req.body
  const encryptedPassword = encryptPassword(password)
  const details = { email, encryptedPassword, name }
  db.push(details)
  res.json({ success: true, db })
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body
  const user = db.filter(u => u.email === email)[0]
  const isValid = user
    ? bcrypt.compareSync(password, user.encryptedPassword)
    : false

  if (isValid) {
    const token = jwt.sign({ email: user.email, name: user.name }, 'bears19')
    res.json(token)
  } else {
    res.status(400).json(`Wrong credentials!`)
  }
})

module.exports = router
