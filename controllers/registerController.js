const prisma = require('../db/prismaClient');
const bcrypt = require('bcryptjs');


const createAccount = async (req, res, next) => {
  try {
    const checkIfUsernameUsed = await prisma.users.findFirst({
      where: {
        username: req.body.username,
      }
    });

    if(checkIfUsernameUsed){
      return res.json({
        message: 'Username already exists',
      });
    }


    const hashedPass = await bcrypt.hash(req.body.password, 10);
    await prisma.users.create({
      data: {
        username: req.body.username,
        password: hashedPass,
      }
    });
    res.json({
      message: 'Account created'
    })
  } catch(err) {
    console.error(err);
    next(err);
    res.json(err)
  }
};



module.exports = {
  createAccount,
}