const prisma = require('../db/prismaClient');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const createAccount = async (req, res, next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    const checkIfUsernameUsed = await prisma.users.findFirst({
      where: {
        username: req.body.username,
      }
    });



    if(!!checkIfUsernameUsed){

      return res.status(400).json({
        message: 'Username already exists, please try again',
      });

    } else {

      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const createdUser = await prisma.users.create({
        data: {
          username: req.body.username,
          password: hashedPass,
        }
      });

      if(req.body.author == true) {
        await prisma.authors.create({
          data: {
            userId: createdUser.id,
            bio: req.body.bio,
          }
        })
      }


      res.status(200).json({
        message: 'Account created'
      })
    }




  } catch(err) {
    console.error(err);
    next(err);
    return res.status(400).json(err);
  }
};



module.exports = {
  createAccount,
}