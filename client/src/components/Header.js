import React, { Component } from 'react';
// import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Link from 'react-router-dom';
// import Home from './Home';
// import Cart from './Cart';
// import About from './About';
// import NotFound from './NotFound';

class Header extends Component {
  render() {
    return(

      <div className="App-header">
        <h2>
          <Link to="/" > Code Candles </Link>
        </h2>
          <ul>
            <li>
              <Link to="/about" > About </Link>
            </li>
            <li>
              <Link to="/cart" > Cart </Link>
            </li>
          </ul>
      </div>
    );
  }
}

export default Header;
