var express = require('express');
var router = express.Router();
require('dotenv').config()
const moment = require('moment');
const nodemailer = require('nodemailer');

//post email message

router.post('/', (req, res, next) => {
  // setting transporter variable to nodemailer, invoking createTransport method, and passing gmail log in credentials as an object
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          // Reading username from process object
          user:process.env.GMAIL_USERNAME,
          // Reading password from process object
          pass:process.env.GMAIL_PASSWORD,
          pass:process.env.GMAIL_PASSWORD2
      }
  });

  const timeOfPurchase = req.body.created;
  const time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  const cents = req.body.amount;
  const dollars = cents/Math.pow(10,2);
  const total = dollars.toFixed(2)
  const card = req.body.card;
  // setting up email - sending a copy to buyer and seller
  let mailOptions = {
      from: `${process.env.GMAIL_USERNAME}`, // sender address from env variable
      to: `${req.body.email}`, // list of recipients
      subject: `Your candle order! ${timeOfPurchase}`, // Email subject
      html:
        `
          <h4>Hello, ${card.name}!</h4> </br>

          <p>Thank you for your purchase of the following soy candles:</p> </br>

          <strong><div style="margin:15px; background-color: #fafafa;">
            ${req.body.description}
            $${total}
          </div></strong> </br>

          <p>Your order number is <strong>${timeOfPurchase}</strong>,
          purchased on <strong>${time}</strong>.
          Please keep this email for reference.
          Your items will ship in 3-5 business days to:</p> </br>

          <p>Address line 1: ${card.address_line1}</p>
          <p>Address line 2: ${card.address_line2}</p>
          <p>City/State: ${card.address_city}, ${card.address_state}</p>
          <p>Zip: ${card.address_zip}</p> </br>

          <p>Cheers,</p> </br>
          <p style="color:#2196f3;">The HackerCandle Team</p>
        ` // html body
  };

  // sending email using sendMail method
  transporter.sendMail(mailOptions, (error, info) => {
      console.log(`${process.env.GMAIL_USERNAME}`)
      // console.log(`process +:+:+ ${JSON.stringify(process.env)}`)
      if (error) {
          return console.log(error);
          res.redirect('/error')
      }
      console.log(`Messages sent `, info.messageId, info.response);
      res.send(`Messages sent `, info.messageId, info.response);
  });

});

module.exports = router;
