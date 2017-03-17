import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class TakeMoney extends Component {
  onToken = (token) => {
    console.log('TOKEN +:+:+:+:+:+ ' + JSON.stringify(token))
    axios.post('/save-stripe-token', JSON.stringify(token))
    // .then(response => response.json())
    .then(response => {
        console.log('RESPONSE DATAT +:+:+:+:+ ' + response.data)
        alert(`We are in business, email`);
      })
    .catch(err => console.log(err))
    };

  render() {
    const { amount, description } = this.props;
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_x7m7cWJPeFzSkjQ8uV7PidI6"
        shippingAddress={true}
        billingAddress={true}
        zipcode={true}
        amount={amount}
        description={description}
        name="Hackercandle"
        locale="auto"
        currency="USD"
      />
    )
  }
}

// stripeKey="pk_test_x7m7cWJPeFzSkjQ8uV7PidI6"
//stripeKey="pk_live_JbHS9IW8g2QzSCTGHPnq59uP"

export default TakeMoney;
