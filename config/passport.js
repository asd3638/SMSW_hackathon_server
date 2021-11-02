var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const google = require('./key');

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: google.client_id,
      clientSecret: google.client_secret,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      //console.log("profile: ", profile);
      //console.log("accessToken", accessToken);
      try {
        const exUser = await User.findOne({
          where: {
            email: profile.emails[0].value,
            provider: "google",
          },
        });
        if (exUser) {
          const googleToken = await Token.create({
            accessToken: accessToken,
            email: profile.emails[0].value,
          })
          return done(null, exUser, googleToken);
        } else {
          const hashedPassword = await bcrypt.hash(profile.displayName, 11);
          const newUser = await User.create({
            email: profile.emails[0].value,
            password: hashedPassword,
            nick: profile.displayName,
            snsId: profile.id,
            provider: "google",
          });
          const googleToken = await Token.create({
            accessToken: accessToken,
            email: profile.emails[0].value,
          });
          done(null, newUser, googleToken);
        }
      } catch (err) {
        console.error(err);
        done(err);
      }
    }
  )
);

module.exports = passport;
