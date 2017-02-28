import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class TakeMoney extends Component {
  onToken = (token) => {
    console.log(token)
    axios.post('/save-stripe-token', JSON.stringify(token))
    // .then(response => response.json())
    .then(response => {
        console.log(response.data)
        alert(`We are in business, email`);
      })
    .catch(err => console.log(err))
    };

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_x7m7cWJPeFzSkjQ8uV7PidI6"
      />
    )
  }
}

export default TakeMoney;
