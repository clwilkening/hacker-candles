import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    const cart = {...this.props.cart}; // grab the cart state
    const candle = {...this.props.inventoryObject}; //grab the candle inventory state
    var cartElements = []; //set empty array
      for(let key in cart) { //loop through the cart
        let item = cart[key]; //set item to the value of each key
        //push the items into empty array
        this.props.cart[key] === null || isNaN(this.props.cart[key]) ?
        //if the cart is empty set the default value to one, else set it to item.
        cartElements.push(
          <div className="cart-item" key={key}>
            <img className="cart-image" alt={candle[key]} src={candle[key].image}></img>
            <div className="cart-container">
              <h4 className="cart-name">{candle[key].name}</h4>
              <p>price/candle: ${candle[key].price}</p>
              <p>scent: {candle[key].scent}</p>
            </div>
            <div className="quant-cont">
              <p className="quantity">quantity:</p>
              <input className="quant-input" type="number" min="0" max="10" defaultValue="0" onChange={(e) => this.handleChange(e, key)} required></input>
            </div>
            <div className="x-button" onClick={() => this.props.removeCandle(key)}>X</div>
          </div>
        )
        :
        cartElements.push(
          <div className="cart-item" key={key}>
            <img className="cart-image" alt={candle[key]} src={candle[key].image}></img>
            <div className="cart-container">
              <h4 className="cart-name">{candle[key].name}</h4>
              <p>price/candle: ${candle[key].price}</p>
              <p>scent: {candle[key].scent}</p>
            </div>
            <div className="quant-cont">
              <p className="quantity">quantity:</p>
              <input className="quant-input" type="number" min="0" max="10" defaultValue={item} onChange={(e) => this.handleChange(e, key)} required></input>
            </div>
            <div className="x-button" onClick={() => this.props.removeCandle(key)}>X</div>
          </div>
        )
      }
      //return the elements
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
          <Link to="/cart/review-order">
          <button id="to-checkout" onClick={() => this.props.finalAmount()}>Proceed to Checkout
          </button></Link>
        </div>
        {this.renderCart()}
        <h4>price before shipping: ${totalPrice}</h4>
      </div>
    );
  };
}

export default Cart;
