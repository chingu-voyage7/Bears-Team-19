const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Express Server is up and running' })
})

module.exports = router
