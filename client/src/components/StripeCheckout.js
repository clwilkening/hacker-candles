import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class TakeMoney extends Component {
  onToken = (token) => {
    const newToken = token;
    newToken['amount'] = this.props.amount;
    newToken['description'] = JSON.stringify(this.props.cart);
    console.log(newToken)
    axios.post('/save-stripe-token', newToken)
    .then(res => {
        alert(`Thank you for your purchase, ${token.email}`);
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
