import React, {Component} from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


class Shipping extends Component {
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
        <div key={key}>
        <h5>{candle[key].name}: {cart[key]}</h5>
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
  const {items} = this.props
   return (

  items > 0 ?
    <h5>Items in cart: {this.itemsInCart()}</h5>
  :
  <Redirect to="/" />
  )
}
}

export default Shipping;
