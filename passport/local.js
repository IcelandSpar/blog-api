require("dotenv").config();
const passport = require("passport");
const prisma = require("../db/prismaClient");
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          username,
        },
      });
      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        return cb(null, false, { message: 'Incorrect password' });
      }

      if (!user) {
        return cb(null, false, { message: "Incorrect email or password." });
      }

      return cb(null, user, { message: "Logged In Successfully" });
    } catch (err) {
      return cb(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwtPayload, done) {

      try {
        const user = await prisma.users.findFirst({
          where: {
            id: jwtPayload.sub,
          }
        });
        if(user) {
          return done(null, user);
        } else {
          return done(null, false)
        }
      } catch(err) {
        if(err) {
          return done(err, false);
        }
  
      }
    }
  )
);
