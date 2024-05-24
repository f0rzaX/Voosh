const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const dotenv = require('dotenv')

dotenv.config();

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, false);
                })
                .catch(err => console.error(erry))
        })
    );

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
    }, async (token, tokenSecret, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                return done(null, user);
            } else {
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    profile: {
                        photo: profile.photos[0].value,
                    }
                })

                await newUser.save();
                return done(null, newUser)
            }
        } catch (err) {
            console.error(err);
            return done(err, false)
        }
    }))
}