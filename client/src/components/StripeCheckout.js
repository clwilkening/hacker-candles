import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class TakeMoney extends Component {
  constructor(props) {
    super(props);


  }

  onToken = (token) => {
    const newToken = token;
    newToken['amount'] = this.props.amount;
    newToken['description'] = JSON.stringify(this.props.cart);
    axios.post('/save-stripe-token', newToken)
    .then(res => {
        alert(`Thank you for your purchase, ${token.card.name}`);
        axios.post('/email-receipt', res.data)
    })
    .then(res => {
      this.props.completedCheckout();
    })
    .catch(err => console.log('REACT ', err))
    };


  render() {
    const { amount } = this.props;
    return (
      <StripeCheckout
        stripeKey="pk_test_x7m7cWJPeFzSkjQ8uV7PidI6"
        shippingAddress
        billingAddress={true}
        zipcode={true}
        amount={amount}
        description="Soy Candles"
        name="Hacker Candle"
        locale="auto"
        currency="USD"
        token={this.onToken}
      />
    )
  }
}

export default TakeMoney;
