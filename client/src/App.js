import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import axios from 'axios';
import './App.css';

class App extends Component {
    componentDidMount() {
      axios.get('/api')
      .then((response) => {
      console.log(response);
    })
      .catch((err) => { console.error(err); });
    }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <div className="App-header">
        <h2 className="brand-name">
          <Link to="/" > Hacker Candles </Link>
        </h2>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/about" > About </Link>
            </li>
            <li>
              <Link to="/cart" > Cart </Link>
            </li>
          </ul>
        </nav>
        </div>
          <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/cart" component={Cart} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
