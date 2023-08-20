const express = require('express');

 const router = express.Router();

const purchaseController = require('../controllers/purchase');
const userAuthenticaion = require('../middlewares/authenticate');

router.get('/premiummembership', userAuthenticaion.authenticate, purchaseController.purchaseMembership);

router.post('/updatetransactionstatus', userAuthenticaion.authenticate, purchaseController.updatetransactionstatus);
 module.exports = router;