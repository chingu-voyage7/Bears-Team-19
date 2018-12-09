const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const client = require('../client')

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
opts.secretOrKey = 'bears19'

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      client
        .getUsers('/users')
        .then(result => {
          const user = result.data.filter(u => u.email === jwtPayload.email)
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => done(err, false))
    }),
  )
}
