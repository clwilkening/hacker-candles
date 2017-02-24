import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import StripeCheck from './StripeCheckout'

class ReviewOrder extends Component {
constructor(props) {
  super(props);

  this.itemsInCart = this.itemsInCart.bind(this);
}

itemsInCart() {
  let cart = {...this.props.cart};
  const candle = {...this.props.inventoryObject};
  let cartElements = [];
    for (let key in cart) {
      cartElements.push(
        <div className="review-item" key={key}>
            <h4>{candle[key].name}:</h4>
            <h4>Qty: {cart[key]} </h4>
            <h4>${candle[key].price}</h4>
        </div>
      );
    }
  return (
    <div>
      {cartElements}
    </div>
  )
};

render() {
  const { shipping, items, useShipping, billingAddress, totalPrice } = this.props
    return (

      items > 0 ?

        <div className="review-container">
        <div className="review-cart-items">
          <h4>Review your order: </h4>
          {this.itemsInCart()}
          <h4>${totalPrice}</h4>
        </div>
        <StripeCheck />
        </div>
      :
        <Redirect to="/" />
    )
  }
}

export default ReviewOrder;
