import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

// import Header from './Header';

class Home extends Component {

constructor(props) {
  super(props);
// this.getInventory = this.getInventory.bind(this);
this.renderInventory = this.renderInventory.bind(this);
// this.addItem = this.addItem.bind(this);
};

renderInventory() {
  const candles = {...this.props.inventoryObject};
  const candleElements = [];
  const {addToCart} = this.props;

  for(let key in candles) {
    let candle = candles[key]
    // console.log(`here is candle loop ${JSON.stringify(candle)}`)

    this.props.cartActive === candle.scent ?
    candleElements.push(
      <div className="candle-item" key={key}>
        <h3>{candle.name}</h3>
        <img key={key} className="success-image"  alt="added-to-cart" src="/images/check.png"></img>
        <h4>${candle.price}</h4>
        <p>scent: {candle.scent}</p>
        <button className="add-button" onClick={ () => addToCart(key) } >Add to Cart</button>
      </div>
    ) : candleElements.push(
      <div className="candle-item" key={key}>
        <h3>{candle.name}</h3>
        <img className="candle-image"  alt={candle.name} src={candle.image}></img>
        <h4>${candle.price}</h4>
        <p>scent: {candle.scent}</p>
        <button className="add-button" onClick={ () => addToCart(key) } >Add to Cart</button>
      </div>
    )

    candleElements.reverse();
  };
  return (
    <div className="candle-container">
      {candleElements}
    </div>
  )
};

  render() {
    const header = (<h1 id="header-home" key="header">Set the mood for code.</h1>);
    return(
      <div>
        <div id="candle-home">
          {header}
        </div>
        {this.renderInventory()}
      </div>
    );
  };
};

export default Home;
