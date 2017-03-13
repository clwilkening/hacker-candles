import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import TakeMoney from './StripeCheckout';
// import axios from 'axios';

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
              <p>Qty: {cart[key]} </p>
              <p>${candle[key].price} each</p>
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
        <div className="review-address" key="shipping-address">
          <h4>Shipping Address</h4>
          <p>{shipping.firstName}</p>
          <p>{shipping.lastName}</p>
          <p>{shipping.addressOne}</p>
          <p>{shipping.addressTwo}</p>
          <p>{shipping.city}</p>
          <p>{shipping.state}</p>
          <p>{shipping.zipcode}</p>
        </div>
      )
      :
      showShipping.push(
        <div className="review-address" key="shipping-address">
          <h4>Shipping Address</h4>
          <p>{shipping.firstName}</p>
          <p>{shipping.lastName}</p>
          <p>{shipping.addressOne}</p>
          <p>{shipping.city}</p>
          <p>{shipping.state}</p>
          <p>{shipping.zipcode}</p>
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
        <div className="review-address" key="billing-address">
          <h4>Billing Address</h4>
          <p>{billing.firstName}</p>
          <p>{billing.lastName}</p>
          <p>{billing.addressOne}</p>
          <p>{billing.addressTwo}</p>
          <p>{billing.city}</p>
          <p>{billing.state}</p>
          <p>{billing.zipcode}</p>
        </div>
      )
      :
      showBilling.push(
        <div className="review-address" key="billing-address">
          <h4>Billing Address</h4>
          <p>{billing.firstName}</p>
          <p>{billing.lastName}</p>
          <p>{billing.addressOne}</p>
          <p>{billing.city}</p>
          <p>{billing.state}</p>
          <p>{billing.zipcode}</p>
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
        <div>
          <div className="rev-img rev-img-three">
            <img className="delivery" alt="shipping" src="/images/delivery.png"></img><p></p>
            <img className="address" alt="billing" src="/images/address_book.png"></img><p></p>
            <img className="credit-bold" alt="payment" src="/images/credit_card.png"></img>
          </div>
        <div className="review-container">
          <div className="address-cont">
            {this.showShippingAddress()}
            {this.showBillingAddress()}
          </div>
          <div className="review-cart-cont">
            {this.itemsInCart()}
            <div className="moneys">
            <div className="money"><h4>Candles:</h4><h4> ${totalPrice} </h4></div>
            <div className="money"><h4>Shipping:</h4><h4> ${this.getShippingCost()} </h4></div>
            <div className="money"><h4>Total:</h4><h4>${this.finalAmount()} </h4></div>
            </div>
          </div>
        </div>
        <div className="take-money">  <TakeMoney /></div>
        </div>
      :
        <Redirect to="/" />
    )
  }
}

export default ReviewOrder;
