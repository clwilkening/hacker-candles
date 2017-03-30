var express = require('express');
var router = express.Router();
require('dotenv').config()
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);

router.post('/', (req, res) => {
  const amount = req.body.amount;
  const description = req.body.description;
  stripe.customers.create({
    email: req.body.email,
    source: req.body.id
  })
  .then(customer => {
    stripe.charges.create({
      amount,
      description,
      currency: "usd",
      customer: customer.id,
    })
  })
  .then(charge => {
    res.send(req.body)
  }).catch(err => {
    console.log('HERE DA ERROR AT ', err)
  });
});


module.exports = router;
