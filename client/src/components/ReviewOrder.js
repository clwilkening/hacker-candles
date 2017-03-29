import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import TakeMoney from './StripeCheckout';
// import axios from 'axios';

class ReviewOrder extends Component {
constructor(props) {
  super(props);

  this.itemsInCart = this.itemsInCart.bind(this);
  // this.showShippingAddress = this.showShippingAddress.bind(this);
  // this.showBillingAddress = this.showBillingAddress.bind(this);
  this.getShippingCost = this.getShippingCost.bind(this);
}

  itemsInCart() {
    let cart = {...this.props.cart};
    const candle = {...this.props.inventoryObject};
    let cartElements = [];
      for (let key in cart) {
        cartElements.push(
          <div className="review-item" key={key}>
              <h4>{candle[key].name}: {cart[key]}</h4>
              <p>${candle[key].price * cart[key]}</p>
          </div>
        );
      }
    return (
      <div className="cart-totals">
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

  // showShippingAddress() {
  //   let shipping = {...this.props.shipping};
  //   let showShipping = []

  //     shipping.addressTwo !== "" ?
  //     showShipping.push(
  //       <div className="review-address" key="shipping-address">
  //         <h4>Shipping Address</h4>
  //         <p>{shipping.firstName}</p>
  //         <p>{shipping.lastName}</p>
  //         <p>{shipping.addressOne}</p>
  //         <p>{shipping.addressTwo}</p>
  //         <p>{shipping.city}</p>
  //         <p>{shipping.state}</p>
  //         <p>{shipping.zipcode}</p>
  //       </div>
  //     )
  //     :
  //     showShipping.push(
  //       <div className="review-address" key="shipping-address">
  //         <h4>Shipping Address</h4>
  //         <p>{shipping.firstName}</p>
  //         <p>{shipping.lastName}</p>
  //         <p>{shipping.addressOne}</p>
  //         <p>{shipping.city}</p>
  //         <p>{shipping.state}</p>
  //         <p>{shipping.zipcode}</p>
  //       </div>
  //     )
  //   return (
  //     <div>
  //       {showShipping}
  //     </div>
  //   )
  // }

  // showBillingAddress() {
  //   let billing = {...this.props.billingAddress};
  //   let showBilling = []
  //     billing.addressTwo !== "" ?
  //     showBilling.push(
  //       <div className="review-address" key="billing-address">
  //         <h4>Billing Address</h4>
  //         <p>{billing.firstName}</p>
  //         <p>{billing.lastName}</p>
  //         <p>{billing.addressOne}</p>
  //         <p>{billing.addressTwo}</p>
  //         <p>{billing.city}</p>
  //         <p>{billing.state}</p>
  //         <p>{billing.zipcode}</p>
  //       </div>
  //     )
  //     :
  //     showBilling.push(
  //       <div className="review-address" key="billing-address">
  //         <h4>Billing Address</h4>
  //         <p>{billing.firstName}</p>
  //         <p>{billing.lastName}</p>
  //         <p>{billing.addressOne}</p>
  //         <p>{billing.city}</p>
  //         <p>{billing.state}</p>
  //         <p>{billing.zipcode}</p>
  //       </div>
  //     )
  //   return (
  //     <div>
  //       {showBilling}
  //     </div>
  //   )
  // }

render() {
  const { shipping, items, useShipping, billingAddress, totalPrice, inventoryObject, finalAmount, cart } = this.props;
    return (

      items > 0 ?
        <div>
          <div className="review-container">
            <div className="review-ord">
              <h4>Review your Order</h4>
            </div>
            <div className="review-cart-cont">
              {this.itemsInCart()}
              <div className="moneys">
                <div className="money"><h4>Candles:</h4><h4> ${totalPrice} </h4></div>
                <div className="money"><h4>Shipping:</h4><h4> ${this.getShippingCost()} </h4></div>
                <div className="money"><h4>Total:</h4><h4>${finalAmount / 100} </h4></div>
              </div>
            </div>
          </div>
          <div className="take-money">
            <TakeMoney
              shippingAddress={true}
              amount={finalAmount}
              cart={cart}
            />
          </div>
        </div>
      :
        <Redirect to="/" />
    )
  }
}

export default ReviewOrder;
