const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const User = require('../backend/models/User')

module.exports = async function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            // match User
            User.findOne({ username: username })
            try {
                user => {
                    if (!user) {
                        return done(null, false, {})
                    }

                    // match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {} )
                        }
                    });
                }
            } catch (err) {
                console.log(err)
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}