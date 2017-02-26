import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import TakeMoney from './StripeCheckout'

class ReviewOrder extends Component {
constructor(props) {
  super(props);

  this.itemsInCart = this.itemsInCart.bind(this);
  this.showShippingAddress = this.showShippingAddress.bind(this);
  this.showBillingAddress = this.showBillingAddress.bind(this);
  this.getShippingCost = this.getShippingCost.bind(this);
  this.finalAmount = this.finalAmount.bind(this);
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
              <h4>${candle[key].price} each</h4>
          </div>
        );
      }
    return (
      <div>
        {cartElements}
      </div>
    )
  };

  getShippingCost() {
    let initial = this.props.shippingCost;
    let items = this.props.items;
    const cost = initial + items;
    return cost;
  }

  finalAmount() {
    let initial = this.props.shippingCost;
    let items = this.props.items;
    let cost = initial + items;
    const final = cost + this.props.totalPrice;
    return final;
  }

  showShippingAddress() {
    let shipping = {...this.props.shipping};
    let showShipping = []
      // for (let element in shipping){
      shipping.addressTwo !== "" ?
      showShipping.push(
        <div className="review-address" key="shippingaddress">
          <h4>Shipping Address</h4>
          <h4>{shipping.firstName}</h4>
          <h4>{shipping.lastName}</h4>
          <h4>{shipping.addressOne}</h4>
          <h4>{shipping.addressTwo}</h4>
          <h4>{shipping.city}</h4>
          <h4>{shipping.state}</h4>
          <h4>{shipping.zipcode}</h4>
        </div>
      )
      :
      showShipping.push(
        <div className="review-address" key="shippingaddress">
          <h4>Shipping Address</h4>
          <h4>{shipping.firstName}</h4>
          <h4>{shipping.lastName}</h4>
          <h4>{shipping.addressOne}</h4>
          <h4>{shipping.city}</h4>
          <h4>{shipping.state}</h4>
          <h4>{shipping.zipcode}</h4>
        </div>
      )
    return (
      <div>
        {showShipping}
      </div>
    )
  }

  showBillingAddress() {
    let billing = {...this.props.billingAddress};
    let showBilling = []
      // for (let element in billing){
      billing.addressTwo !== "" ?
      showBilling.push(
        <div className="review-address" key="billingaddress">
          <h4>billing Address</h4>
          <h4>{billing.firstName}</h4>
          <h4>{billing.lastName}</h4>
          <h4>{billing.addressOne}</h4>
          <h4>{billing.addressTwo}</h4>
          <h4>{billing.city}</h4>
          <h4>{billing.state}</h4>
          <h4>{billing.zipcode}</h4>
        </div>
      )
      :
      showBilling.push(
        <div className="review-address" key="billingaddress">
          <h4>billing Address</h4>
          <h4>{billing.firstName}</h4>
          <h4>{billing.lastName}</h4>
          <h4>{billing.addressOne}</h4>
          <h4>{billing.city}</h4>
          <h4>{billing.state}</h4>
          <h4>{billing.zipcode}</h4>
        </div>
      )
    return (
      <div>
        {showBilling}
      </div>
    )
  }

render() {
  const { shipping, items, useShipping, billingAddress, totalPrice } = this.props;
    return (

      items > 0 ?

        <div className="review-container">
        <div className="review-cart-items">
          <h4>Review your order: </h4>
          {this.itemsInCart()}
          <h4>Candles: ${totalPrice}</h4>
          <h4>Shipping: ${this.getShippingCost()}</h4>
          <h4>Total: ${this.finalAmount()}</h4>
        </div>
        <div>
          {this.showShippingAddress()}
          {this.showBillingAddress()}
        </div>
        <TakeMoney />
        </div>
      :
        <Redirect to="/" />
    )
  }
}

export default ReviewOrder;
