const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const User = require('../modelos/Usuario');

let options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
}

module.exports = passport.use(new jwtStrategy({
    ...options
}, (payload, done) => {
    User.findById(payload._doc._id)
    .then(user => {
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
    .catch(err => {
        return done(err, false)
    })
}))