import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


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
  const {items, shipping} = this.props
   return (

  items > 0 ?
    <div className="shipping-form-container">
      <div className="rev-img rev-img-three">
        <img className="delivery-bold" alt="shipping" src="/images/delivery.png"></img><p></p>
        <img className="address" alt="billing" src="/images/address_book.png"></img><p></p>
        <img className="credit" alt="payment" src="/images/credit_card.png"></img>
      </div>
    <h5 className="ship-cart-items">Items in cart: {this.itemsInCart()}</h5>
   { this.props.shipping ?
    <form className="shipping-form" action="#">
      <p>
      <label htmlFor="firstName">First Name:</label>
      <input ref={(input) => this.firstName = input} type="text" name="firstName" defaultValue={shipping.firstName} required/>
      </p>
      <p>
      <label htmlFor="lastName">Last Name:</label>
      <input ref={(input) => this.lastName = input} type="text" name="lastName" defaultValue={shipping.lastName} required/>
      </p>
      <p>
      <label htmlFor="email">Email:</label>
      <input ref={(input) => this.email = input} type="text" name="email" defaultValue={shipping.email} required/>
      </p>
      <p>
      <label htmlFor="phone">Phone:</label>
      <input ref={(input) => this.phone= input} type="phone" name="phone" defaultValue={shipping.phone} />
      </p>
      <p>
      <label htmlFor="addressOne">Address line 1:</label>
      <input ref={(input) => this.addressOne = input} type="text" name="addressOne" defaultValue={shipping.addressOne} required/>
      </p>
      <p>
      <label htmlFor="addressTwo">Address line 2 (optional):</label>
      <input ref={(input) => this.addressTwo = input} type="text" name="addressTwo" defaultValue={shipping.addressTwo} />
      </p>
      <p>
      <label htmlFor="city">City:</label>
      <input ref={(input) => this.city = input} type="text" name="city" defaultValue={shipping.city} required/>
      </p>
      <p>
      <label htmlFor="state">State:</label>
      <input ref={(input) => this.state = input} type="text" name="state" maxLength="2" defaultValue={shipping.state} required/>
      </p>
      <p>
      <label htmlFor="zipcode">Zip Code:</label>
      <input ref={(input) => this.zipcode = input} type="text" name="zipcode" defaultValue={shipping.zipcode} required/>
      </p>
      <button type="submit" className="ship-button" onClick={(e) => this.createShippingAddress(e) }>Save</button>
    </form>
    :
    <form className="shipping-form" action="#">
      <p>
      <label htmlFor="firstName">First Name:</label>
      <input ref={(input) => this.firstName = input} type="text" name="firstName" required />
      </p>
      <p>
      <label htmlFor="lastName">Last Name:</label>
      <input ref={(input) => this.lastName = input} type="text" name="lastName" required />
      </p>
      <p>
      <label htmlFor="email">Email:</label>
      <input ref={(input) => this.email = input} type="text" name="email" required />
      </p>
      <p>
      <label htmlFor="phone">Phone:</label>
      <input ref={(input) => this.phone= input} type="phone" name="phone" />
      </p>
      <p>
      <label htmlFor="addressOne">Address line 1:</label>
      <input ref={(input) => this.addressOne = input} type="text" name="addressOne" required/>
      </p>
      <p>
      <label htmlFor="addressTwo">Address line 2 (optional):</label>
      <input ref={(input) => this.addressTwo = input} type="text" name="addressTwo" placeholder="Apt, Unit, Suite, Etc."/>
      </p>
      <p>
      <label htmlFor="city">City:</label>
      <input ref={(input) => this.city = input} type="text" name="city" required/>
      </p>
      <p>
      <label htmlFor="state">State:</label>
      <input ref={(input) => this.state = input} type="text" name="state" maxLength="2"  required/>
      </p>
      <p>
      <label htmlFor="zipcode">Zip Code:</label>
      <input ref={(input) => this.zipcode = input} type="text" name="zipcode" required/>
      </p>
    <button type="submit"className="ship-button" onClick={(e) => this.createShippingAddress(e) }> Save </button>
    </form>
  }
    { shipping.firstName !== "" && shipping.addressOne !== "" ?
        <div id="to-bill-cont">
        <Link to="/cart/shipping/billing"><button className="to-billing"> Proceed to Billing </button></Link>
        </div>
      :
      <div>
        <p>Please save before contiuing.</p>
      </div>
    }
    </div>
  :
  <Redirect to="/" />
  )
}
}

export default Shipping;
