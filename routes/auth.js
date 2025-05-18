require('dotenv').config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const auth = Router();


auth.post('/', function(req, res, next) {
  passport.authenticate('local', {session: false},
    (err, user, info) => {
      if(err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, {session: false}, (err) => {
        if(err) {
          res.send(err);
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({user, token});
      });
    })(req, res)
});

auth.get('/check-if-auth', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    isAuth: true,
  })
})

module.exports = auth;
