import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

class Billing extends Component {
constructor(props) {
  super(props);

  this.itemsInCart = this.itemsInCart.bind(this);
  this.createBillingAddress = this.createBillingAddress.bind(this);
}

createBillingAddress(e) {
  e.preventDefault()
  if (this.props.useShipping === true){

  }
  let billing = {
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
  this.props.setBillingAddress(billing)
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
  const { shipping, items, useShipping, billingAddress } = this.props
    return (

      items > 0 ?
        <div className="billing-form-container">
        <h5 className="bill-cart-items">Items in cart: {this.itemsInCart()}</h5>
        { useShipping === false ?
        <button onClick={() => this.props.getShipping()}>Use Shipping Address</button>
        :
        <button onClick={() => this.props.getShipping()}>Use Another Address</button>
        }

      { useShipping === true ?
        <form className="billing-form" action="">
          <label htmlFor="firstName">First Name:</label>
          <input ref={(input) => this.firstName = input} type="text" name="firstName" value={shipping.firstName} required/>
          <label htmlFor="lastName">Last Name:</label>
          <input ref={(input) => this.lastName = input} type="text" name="lastName" value={shipping.lastName} required/>
          <label htmlFor="email">Email:</label>
          <input ref={(input) => this.email = input} type="text" name="email" value={shipping.email} required/>
          <label htmlFor="phone">Phone:</label>
          <input ref={(input) => this.phone= input} type="text" name="phone" value={shipping.phone} />
          <label htmlFor="addressOne">Address line 1:</label>
          <input ref={(input) => this.addressOne = input} type="text" name="addressOne" value={shipping.addressOne} required/>
          <label htmlFor="addressTwo">Address line 2 (optional):</label>
          <input ref={(input) => this.addressTwo = input} type="text" name="addressTwo" value={shipping.addressTwo} />
          <label htmlFor="city">City:</label>
          <input ref={(input) => this.city = input} type="text" name="city" value={shipping.city} required/>
          <label htmlFor="state">State:</label>
          <input ref={(input) => this.state = input} type="text" name="state" maxLength="2" value={shipping.state} required/>
          <label htmlFor="zipcode">Zip Code:</label>
          <input ref={(input) => this.zipcode = input} type="text" name="zipcode" value={shipping.zipcode} required/>
          <button className="add-button" onClick={(e) => this.createBillingAddress(e) }>Use this Address</button>
        </form>
        :
        <form className="billing-form" action="">
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
          <button className="add-button" onClick={(e) => this.createBillingAddress(e) }>Use this Address</button>
        </form>
      }
      { billingAddress.firstName !== "" && billingAddress.addressOne !== "" ?
          <div>
          <h3>Credit Card</h3>
          <button><Link to="/cart/review-order/">Review Order</Link></button>
          </div>
        :
          <p>please fill out form and click 'Use this Address'</p>
      }
      </div>
      :
      <Redirect to="/" />
    )
  }
}

export default Billing;
