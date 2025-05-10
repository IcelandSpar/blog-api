const passport = require('passport');
const prisma = require('../db/prismaClient');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async function (username, password, cb) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          username,
          password,
        }
      });
  
      if(!user) {
        return cb(null, user, {messge: 'Incorrect email or password.'});
  
      }
  
      return cb(null, user, {message: 'Logged In Successfully'});
    } catch(err) {
      return cb(err);
    }
  }
))