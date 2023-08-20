const RazorPay = require('razorpay');
const Order = require('../models/orders');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database');
const generateWebToken = (id, isPremium) => {
    return jwt.sign({ userId: id, isPremium}, 'secretkeyforexpensetracker');
 }
exports.purchaseMembership = async(req,res) => {
    const t = await sequelize.transaction();
    try {
      
        var rzp = new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 25;
        const currency = 'INR'
        const options = {
            amount: amount * 100,
            currency
        };

       const response = await rzp.orders.create(options)
          const order = await req.user.createOrder({ orderId: response.id, status: 'PENDING'}, {transaction:t})
          await t.commit();
         res.status(201).json({ response, key_id: rzp.key_id });
           
      
    }catch(err){
        await t.rollback();
        res.status(403).json({ message: 'Something Went Wrong', error: err})
    }
}

exports.updatetransactionstatus = async(req,res, next) => {
    const userId = req.user.id;
    const t = await sequelize.transaction();
    try {
        const {payment_id, order_id} = req.body;
        if(!payment_id) {
        const order = await Order.findOne({ where: {orderId: order_id} }, {transaction:t});
        await order.update({ status: 'Failed'}, {transaction:t});
        await req.user.update({ isPremium: false}, {transaction:t});
        }  else {
        const order = await Order.findOne({ where: {orderId: order_id} }, {transaction:t});
        await order.update({ paymentId: payment_id, status: 'SUCCESSFUL'}, {transaction:t});
        await req.user.update({ isPremium: true}, {transaction:t});
        await t.commit();
        res.status(202).json({token:generateWebToken(userId,true),isPremium:req.user.isPremium, message: "Transaction Completed"})
        }


    }catch(err) {
        await t.rollback();
        throw new Error(err);
    }

}