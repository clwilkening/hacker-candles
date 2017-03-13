import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// import FontAwesome from 'react-fontawesome';
import Home from './components/Home';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import About from './components/About';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import Billing from './components/Billing';
import ReviewOrder from './components/ReviewOrder';
// import StripeCheckout from './components/StripeCheckout';
import NotFound from './components/NotFound';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.getCandles = this.getCandles.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setShippingState = this.setShippingState.bind(this);
    this.getShipping = this.getShipping.bind(this);
    this.setBillingAddress = this.setBillingAddress.bind(this);

    this.state = {
      volume: "8oz",
      cart: {},
      totalPrice: 0,
      items: 0,
      shipping: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        addressOne: "",
        addressTwo: "",
        city: "",
        state: "",
        zipcode: "",
      },
      billingAddress: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        addressOne: "",
        addressTwo: "",
        city: "",
        state: "",
        zipcode: "",
      },
      useShipping: false,
      shippingCost: 4,
    };
  }
    componentDidMount() {
      this.getCandles();
    }

  getCandles() {
    axios.get('https://hackercandleinventory.firebaseio.com/.json?/candles')
      .then((response) => {
      // console.log(response.data);
      this.setState({
        inventoryObject: response.data.candles
      })
    })
      .catch((err) => { console.error(err); });
  }

  addToCart(key) {
    // console.log(`HERE DA KEY +:+ ${key}`)
    const cart = {...this.state.cart};
    cart[key] = cart[key] + 1 || 1
    let order = {...this.state.inventoryObject};
    let price = this.state.totalPrice;
    price = price + order[key].price;
    let items = price / order[key].price;
    this.setState({
      cart,
      totalPrice: price,
      items,
    })
  }

  removeCandle = (key) => {
    // console.log(`key = ${key}`)
    let cart = {...this.state.cart};
    // console.log(`cart = ${JSON.stringify(cart)}`)
    let candlePrice = this.state.inventoryObject[key].price;
    // console.log(`candle price = ${candlePrice}`)
    // console.log(`cart[key] = ${cart[key]}`)
    let priceToSubtract = candlePrice * cart[key];
    let totalPrice = this.state.totalPrice;
    // console.log(`TotalPrice = ${totalPrice}`)
    let newPrice = totalPrice - priceToSubtract;
    let items = newPrice / candlePrice;
    console.log(`new Price = ${newPrice}`)
    delete cart[key];
    this.setState({
      cart,
      totalPrice: newPrice,
      items,
    });
  };

  updateCart = (key, value) => {
    let cart = {...this.state.cart};
    cart[key] = value;
    // console.log(cart[key])
    // console.log(`after ${JSON.stringify(cart)}`)
    let totalPrice = this.state.totalPrice;
    // console.log(totalPrice)
    let candlePrice = this.state.inventoryObject[key].price;
    // console.log(candlePrice)
    //loop through cart, grab values
    let cartItems =[];
      for (var item in cart) {
        // console.log(`My key loopty loop === ${key}`)
        var obj = cart[item]
        // console.log(`My object === ${obj}`)
        if (isNaN(obj)){
          cartItems.pop(obj)
        } else {
        cartItems.push(obj)
        // console.log(`Twas a number === ${cartItems}`)
        };
      };
    let getSum = (total, num) => {
      return total + num;
    };
    let newCartItems = cartItems.reduce(getSum);
    // console.log(`new cart items = ${newCartItems}`)
    let newTotal = candlePrice * newCartItems;
    // console.log(newTotal)
    this.setState({
      cart,
      totalPrice: newTotal,
      items: newCartItems,
    });
  };

  setShippingState(shipping) {
    this.setState({
      shipping,
    });
  };

  getShipping() {
    if (this.state.useShipping === false){
      this.setState({
        useShipping: true,
      });
    } else {
      this.setState({
        useShipping: false,
      });
    };
  };

  setBillingAddress(shipping) {
    this.setState({
      billingAddress: shipping,
    });
  };

  render() {
    //let items = <span key={this.state.items}>{this.state.items}</span>
    return (
      <BrowserRouter>
        <div className="App">
        <div className="App-header">
        <h2 className="brand-name">
          <Link className="link" to="/"> Hacker Candles </Link>
        </h2>
        <nav className="nav">
          <ul>
            <li>
              <Link className="link nav-item" to="/about" > About </Link>
            </li>
            <li>
              <Link className="link" to="/cart" ><img className="cart-img" alt="cart" src="/images/shopping_basket.png"></img></Link>
            </li>
            <li className="count-cont">
            <CSSTransitionGroup
              className="count"
              component="span"
              transitionName="count"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
              >
              <span key={this.state.items}>{this.state.items}</span>
            </CSSTransitionGroup>
            </li>
          </ul>
        </nav>
        </div>
          <div className="main">
          <Switch>
            <Route exact path="/" render={() => (
              <Home
                inventoryObject={this.state.inventoryObject}
                addToCart={this.addToCart}
              />
            )} />
            <Route exact path="/about" render={() => (
              <About
                inventoryObject={this.state.inventoryObject}
              />
            )} />
            <Route exact path="/cart" render={() => (
              <Cart
                inventoryObject={this.state.inventoryObject}
                cart={this.state.cart}
                totalPrice={this.state.totalPrice}
                updateCart={this.updateCart}
                removeCandle={this.removeCandle}
              />
            )} />
            <Route exact path="/cart/shipping" render={() => (
              <Shipping
                inventoryObject={this.state.inventoryObject}
                items={this.state.items}
                cart={this.state.cart}
                setShippingState={this.setShippingState}
                shipping={this.state.shipping}
              />
            )} />
            <Route exact path="/cart/shipping/billing" render={() => (
              <Billing
                inventoryObject={this.state.inventoryObject}
                items={this.state.items}
                cart={this.state.cart}
                setShippingState={this.setShippingState}
                shipping={this.state.shipping}
                useShipping={this.state.useShipping}
                getShipping={this.getShipping}
                billingAddress={this.state.billingAddress}
                setBillingAddress={this.setBillingAddress}
              />
            )} />
            <Route exact path="/cart/review-order" render={() => (
              <ReviewOrder
                inventoryObject={this.state.inventoryObject}
                items={this.state.items}
                cart={this.state.cart}
                setShippingState={this.setShippingState}
                shipping={this.state.shipping}
                useShipping={this.state.useShipping}
                getShipping={this.getShipping}
                billingAddress={this.state.billingAddress}
                setBillingAddress={this.setBillingAddress}
                totalPrice={this.state.totalPrice}
                shippingCost={this.state.shippingCost}
              />
            )} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
