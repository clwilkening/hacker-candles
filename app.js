var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config()

// var index = require('./routes/index');
// var users = require('./routes/users');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const app = express();
// const app = require("express")();
const stripe = require("stripe")(keySecret);



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));


// app.use('/save-stripe-token', (req, res) => {
//   res.json({message: 'hello world'});
// });


// app.get("/", (req, res) =>
//   res.render("index.pug", {keyPublishable}));

app.post('/save-stripe-token', (req, res) => {
  let amount = 0.01;
  // console.log('reqbody yo +:+:+ ' + req.body)
  // console.log('STRIPE TOKEN YO +:+:+ ' + req.body.token)
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
  .then(charge => {
    console.log(charge);
    res.json({message:'hello steve'})
  }).catch(err => {
    console.log(err)
  });
});
// File(path.resolve(__dirname, 'client/build', 'index.html'))
app.listen(4567);

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
