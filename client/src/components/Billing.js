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
        <div className="shipping-form-container">
        <h5 className="ship-cart-items">Items in cart: {this.itemsInCart()}</h5>
        { useShipping === false ?
        <button className="ship-button" onClick={() => this.props.getShipping()}>Use Shipping Address</button>
        :
        <button className="ship-button" onClick={() => this.props.getShipping()}>Use Another Address</button>
        }

      { useShipping === true ?
        <form className="shipping-form" action="">
          <p>
          <label htmlFor="firstName">First Name:</label>
          <input ref={(input) => this.firstName = input} type="text" name="firstName" value={shipping.firstName} required/></p>
          <p>
          <label htmlFor="lastName">Last Name:</label>
          <input ref={(input) => this.lastName = input} type="text" name="lastName" value={shipping.lastName} required/></p>
          <p>
          <label htmlFor="email">Email:</label>
          <input ref={(input) => this.email = input} type="text" name="email" value={shipping.email} required/></p>
          <p>
          <label htmlFor="phone">Phone:</label>
          <input ref={(input) => this.phone= input} type="text" name="phone" value={shipping.phone} /></p>
          <p>
          <label htmlFor="addressOne">Address line 1:</label>
          <input ref={(input) => this.addressOne = input} type="text" name="addressOne" value={shipping.addressOne} required/></p>
          <p>
          <label htmlFor="addressTwo">Address line 2 (optional):</label>
          <input ref={(input) => this.addressTwo = input} type="text" name="addressTwo" value={shipping.addressTwo} /></p>
          <p>
          <label htmlFor="city">City:</label>
          <input ref={(input) => this.city = input} type="text" name="city" value={shipping.city} required/></p>
          <p>
          <label htmlFor="state">State:</label>
          <input ref={(input) => this.state = input} type="text" name="state" maxLength="2" value={shipping.state} required/></p>
          <p>
          <label htmlFor="zipcode">Zip Code:</label>
          <input ref={(input) => this.zipcode = input} type="text" name="zipcode" value={shipping.zipcode} required/></p>
          <button className="ship-button" onClick={(e) => this.createBillingAddress(e) }>Use this Address</button>
        </form>
        :
        <form className="shipping-form" action="">
          <p>
          <label htmlFor="firstName">First Name:</label>
          <input ref={(input) => this.firstName = input} type="text" name="firstName" required /></p>
          <p>
          <label htmlFor="lastName">Last Name:</label>
          <input ref={(input) => this.lastName = input} type="text" name="lastName" required /></p>
          <p>
          <label htmlFor="email">Email:</label>
          <input ref={(input) => this.email = input} type="text" name="email" required /></p>
          <p>
          <label htmlFor="phone">Phone:</label>
          <input ref={(input) => this.phone= input} type="text" name="phone" /></p>
          <p>
          <label htmlFor="addressOne">Address line 1:</label>
          <input ref={(input) => this.addressOne = input} type="text" name="addressOne" required/></p>
          <p>
          <label htmlFor="addressTwo">Address line 2 (optional):</label>
          <input ref={(input) => this.addressTwo = input} type="text" name="addressTwo" placeholder="Apt, Unit, Suite, Etc."/></p>
          <p>
          <label htmlFor="city">City:</label>
          <input ref={(input) => this.city = input} type="text" name="city" required/></p>
          <p>
          <label htmlFor="state">State:</label>
          <input ref={(input) => this.state = input} type="text" name="state" maxLength="2"  required/></p>
          <p>
          <label htmlFor="zipcode">Zip Code:</label>
          <input ref={(input) => this.zipcode = input} type="text" name="zipcode" required/></p>
          <button className="ship-button" onClick={(e) => this.createBillingAddress(e) }>Use this Address</button>
        </form>
      }
      { billingAddress.firstName !== "" && billingAddress.addressOne !== "" ?
          <div id="to-bill-cont">
          <Link to="/cart/review-order/"><button className="ship-button">Review and Pay</button></Link>
          </div>
        :
          <p>Please fill out form and click 'Use this Address'.</p>
      }
      </div>
      :
      <Redirect to="/" />
    )
  };
};

export default Billing;
