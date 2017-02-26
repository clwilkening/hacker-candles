import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.renderCart = this.renderCart.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // this.state = {};
  }

  handleChange(e, key) {
    const item = this.props.cart[key];
    const value = parseInt(e.target.value, 10);
    this.props.updateCart(key, value);
  }

  renderCart() {
    const cart = {...this.props.cart};
    const candle = {...this.props.inventoryObject};
    // console.log(candle);
    var cartElements = [];
      for(let key in cart) {
        // console.log(key);
        let item = cart[key];
        // console.log(`ITEM FROM LOOP ++++ ${item}`)
        // console.log(`here is candle loop ${JSON.stringify(candle)}`)
        // console.log(candle[key].name)
        cartElements.push(
          <div className="cart-item" key={key}>
          <img className="cart-image" src="http://placehold.it/100x100"></img>
          <div className="cart-container">
          <h4 className="cart-name">{candle[key].name}</h4>
          <p>price/candle: ${candle[key].price}</p>
          <p>scent: {candle[key].scent}</p>
          </div>
          <div className="quant-cont">
          <p className="quantity">quantity:</p>
          { this.props.cart[key] === null || isNaN(this.props.cart[key])
          ?
            <div>
            <input className="quant-input" type="number" min="0" max="10" defaultValue="1" onChange={(e) => this.handleChange(e, key)} required></input>
            </div>
          :
            <input className="quant-input" type="number" min="0" max="10" defaultValue={item} onChange={(e) => this.handleChange(e, key)} required></input>
          }
          </div>
          <div className="x-button" onClick={() => this.props.removeCandle(key)}>X</div>
          </div>
        )
       // console.log(`cart[key] = ${key} + ${this.props.cart[key]}`)
      }
      return (
        <div>
        {cartElements}
        </div>
      )
  }

  render() {
    let {cart, totalPrice, inventoryObject} = this.props;
    // console.log('cart = ' + JSON.stringify(cart) )
    return(
      JSON.stringify(cart) === "{}" ?
      <div>
      <h1 className="no-candles">No Candles in Cart</h1>
      </div>
      :
      <div>
        <div>
          <Link to="/cart/shipping"><button id="to-checkout">Proceed to Checkout </button></Link>
        </div>
        {this.renderCart()}
        <h4>price before shipping: ${totalPrice}</h4>
      </div>
    );
  };
}

export default Cart;
