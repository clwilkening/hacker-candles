import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';

class TakeMoney extends Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // ...

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
