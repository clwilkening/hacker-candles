import React, {Component} from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


class Shipping extends Component {
constructor(props) {
  super(props);

  this.itemsInCart = this.itemsInCart.bind(this);
  this.createShippingAddress = this.createShippingAddress.bind(this);
}

createShippingAddress(e) {
  e.preventDefault()
  let shipping = {
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    email: this.email.value,
    phone: this.phone.value,
    addressOne: this.addressOne.value,
    addressTwo: this.addressTwo.value,
    city: this.city.value,
    state: this.state.value,
    zipcode: this.zipcode.value,
  }
  this.props.setShippingState(shipping)
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
    <div>
    <h5>Items in cart: {this.itemsInCart()}</h5>
   { this.props.shipping ?
    <form action="">
      <label htmlFor="firstName">First Name:</label>
      <input ref={(input) => this.firstName = input} type="text" name="firstName" defaultValue={this.props.shipping.firstName} required/>
      <label htmlFor="lastName">Last Name:</label>
      <input ref={(input) => this.lastName = input} type="text" name="lastName" defaultValue={this.props.shipping.lastName} required/>
      <label htmlFor="email">Email:</label>
      <input ref={(input) => this.email = input} type="text" name="email" defaultValue={this.props.shipping.email} required/>
      <label htmlFor="phone">Phone:</label>
      <input ref={(input) => this.phone= input} type="text" name="phone" defaultValue={this.props.shipping.phone} />
      <label htmlFor="addressOne">Address line 1:</label>
      <input ref={(input) => this.addressOne = input} type="text" name="addressOne" defaultValue={this.props.shipping.addressOne} required/>
      <label htmlFor="addressTwo">Address line 2 (optional):</label>
      <input ref={(input) => this.addressTwo = input} type="text" name="addressTwo" defaultValue={this.props.shipping.addressTwo} />
      <label htmlFor="city">City:</label>
      <input ref={(input) => this.city = input} type="text" name="city" defaultValue={this.props.shipping.city} required/>
      <label htmlFor="state">State:</label>
      <input ref={(input) => this.state = input} type="text" name="state" maxLength="2" defaultValue={this.props.shipping.state} required/>
      <label htmlFor="zipcode">Zip Code:</label>
      <input ref={(input) => this.zipcode = input} type="text" name="zipcode" defaultValue={this.props.shipping.zipcode} required/>
      <button onClick={(e) => this.createShippingAddress(e) }>Proceed to Billing</button>
    </form>
    :
    <form action="">
      <label htmlFor="firstName">First Name:</label>
      <input ref={(input) => this.firstName = input} type="text" name="firstName" required />
      <label htmlFor="lastName">Last Name:</label>
      <input ref={(input) => this.lastName = input} type="text" name="lastName" required />
      <label htmlFor="email">Email:</label>
      <input ref={(input) => this.email = input} type="text" name="email" required />
      <label htmlFor="phone">Phone:</label>
      <input ref={(input) => this.phone= input} type="text" name="phone" />
      <label htmlFor="addressOne">Address line 1:</label>
      <input ref={(input) => this.addressOne = input} type="text" name="addressOne" required/>
      <label htmlFor="addressTwo">Address line 2 (optional):</label>
      <input ref={(input) => this.addressTwo = input} type="text" name="addressTwo" placeholder="Apt, Unit, Suite, Etc."/>
      <label htmlFor="city">City:</label>
      <input ref={(input) => this.city = input} type="text" name="city" required/>
      <label htmlFor="state">State:</label>
      <input ref={(input) => this.state = input} type="text" name="state" maxLength="2"  required/>
      <label htmlFor="zipcode">Zip Code:</label>
      <input ref={(input) => this.zipcode = input} type="text" name="zipcode" required/>
      <button onClick={(e) => this.createShippingAddress(e) }> Proceed to Billing </button>
    </form>
  }
    </div>
  :
  <Redirect to="/" />
  )
}
}

export default Shipping;
