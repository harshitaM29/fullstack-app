const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const userAuthenticaion = require('../middlewares/authenticate');
const downloadController = require('../controllers/report');

router.post('/signup',userController.postUserData);
router.get('/download',userAuthenticaion.authenticate,downloadController.downloadReport);
router.get('/getfilesdownloaded',userAuthenticaion.authenticate,downloadController.getFileDownloadedData);

router.post('/login',userController.postLoginUserData);

module.exports = router;