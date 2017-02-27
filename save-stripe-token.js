var express = require('express');
var router = express.Router();
var stripe = require('stripe');

 app.post("/save-stripe-token", (req, res) => {
   let amount = 500;
   stripe.customers.create({
      email: req.body.stripeEmail,
     source: req.body.stripeToken
   })
   .then(customer =>
     stripe.charges.create({
       amount,
       description: "Sample Charge",
          currency: "usd",
          customer: customer.id
     }))
   .then(charge => res.sendFile(path.resolve(__dirname, 'client/build', 'index.html')));
 });

 app.listen(4567);

 // module.exports =
