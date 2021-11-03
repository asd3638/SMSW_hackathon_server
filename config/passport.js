var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const google = require('./key');
const kakaoStrategy = require('passport-kakao').Strategy;

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

/*
 * KAKAO LOGIN
 */

passport.use('kakao-login', new kakaoStrategy({
  clientID: '2b212c8495e1445374020dbc4d29da0b',
  callbackURL: 'http://localhost:8080/auth/kakao/callback',
}, async(accessToken, refreshToken, profile, done) =>
{
   //console.log(accessToken); 
   //console.log(profile._json.kakao_account.email); 

try {
  const exUser = await User.findOne({
    where: {
      email: profile._json.kakao_account.email,
      provider: "kakao",
    },
  });
  // 만약 이미 접속한 유저라면
  if (exUser) {
    const kakaoToken = await Token.create({
      accessToken: accessToken,
      email: profile._json.kakao_account.email
    })
    return done(null, exUser, kakaoToken);
  } else {
    const hashedPassword = await bcrypt.hash(profile.displayName, 11);
    const newUser = await User.create({
      email: profile._json.kakao_account.email,
      password: hashedPassword,
      nick: profile.displayName,
      snsId: profile.id,
      provider: "kakao",
    });
    const kakaoToken = await Token.create({
      accessToken: accessToken,
      email: profile._json.kakao_account.email
    });
    done(null, newUser, kakaoToken);
  }
} catch (err) {
  console.error(err);
  done(err);
}

}));

module.exports = passport;
