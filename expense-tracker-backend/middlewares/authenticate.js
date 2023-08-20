const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = async(req,res,next) => {
    try {
        const token = req.header('Authorization')
        const userInfo = jwt.verify(token, 'secretkeyforexpensetracker')
        const user = await User.findByPk(userInfo.userId);
        req.user = user;
        next();
    } catch(err)  {
        console.log(err);
        return res.status(401).json({ success: false})
    }
}

module.exports =  {
    authenticate
};