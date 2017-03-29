import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class TakeMoney extends Component {
  onToken = (token) => {
    const newToken = token;
    newToken['amount'] = this.props.amount;
    axios.post('/save-stripe-token', newToken)
    .then(res => {
        alert(`Thank you for your purchase, ${token.email}`);
      })
    .catch(err => console.log('REACT ', err))
    };



  render() {
    const { amount, description } = this.props;
    return (
      <StripeCheckout
        stripeKey="pk_live_JbHS9IW8g2QzSCTGHPnq59uP"
        shippingAddress
        billingAddress={true}
        zipcode={true}
        amount={amount}
        description={description}
        name="Hacker Candle"
        locale="auto"
        currency="USD"
        token={this.onToken}
      />
    )
  }
}

export default TakeMoney;
