var express = require('express');
var router = express.Router();
//const app = require("express")()
require('dotenv').config()
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);

router.post('/', (req, res) => {
  let amount = req.body.amount;
  stripe.customers.create({
    email: req.body.email,
    source: req.body.id
  })
  .then(customer => {
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id,
    })
  })
  .then(charge => {
    res.json({message: 'charged'})
  }).catch(err => {
    console.log('HERE DA ERROR AT ', err)
  });
});


module.exports = router;
