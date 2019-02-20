const db = require('../database/database.js')

const isAuthenticated = async (req, res, next) => {
  // check that user exists
  const { uid } = req.headers
  if (!uid) {
    res.status(404).json({ error: 'Not authorized' })
  } else {
    // Check so there is a user in database
    const userResponse = await db('users')
      .where({ uid })
      .select()

    if (!userResponse.length) {
      res.status(404).json({ error: 'Not authorized' })
    } else {
      // User is authenticated and exists.
      const [{ user_id }] = userResponse
      req.userId = user_id
      next()
    }
  }
}

module.exports = { isAuthenticated }
