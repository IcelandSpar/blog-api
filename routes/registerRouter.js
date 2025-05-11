const { Router } = require('express');
const registerRouter = Router();
const { createAccount } = require('../controllers/registerController');

registerRouter.post('/', createAccount);



module.exports = registerRouter;