const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');
const userAuthenticaion = require('../middlewares/authenticate');

router.get('/expenses', userAuthenticaion.authenticate, expenseController.getExpenseData);

router.post('/expenses',userAuthenticaion.authenticate,expenseController.postExpenseData);

router.delete('/expense-delete/:id',userAuthenticaion.authenticate,expenseController.deleteExpenseData);

module.exports = router;