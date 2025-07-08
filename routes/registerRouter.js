const { Router } = require('express');
const registerRouter = Router();
const { createAccount } = require('../controllers/registerController');
const { registerValidator } = require('../validators/registerValidator.js');
const prisma = require('../db/prismaClient');

registerRouter.post('/', registerValidator, createAccount);

registerRouter.delete('/delete/:userId', async (req, res) => {
  const deletedUser = await prisma.users.delete({
    where: {
      id: req.params.userId
    }
  });

  res.json(deletedUser)
})



module.exports = registerRouter;