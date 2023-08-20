const express = require('express');

const router = express.Router();

const premiumController = require('../controllers/premium');
const userAuthenticaion = require('../middlewares/authenticate');

router.get('/showLeaderBoard',userAuthenticaion.authenticate,premiumController.getLeaderBoardData);

module.exports = router;