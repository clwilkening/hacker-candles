import React, { Component } from 'react';
// import Header from './Header';

class Home extends Component {

constructor(props) {
  super(props);
// this.getInventory = this.getInventory.bind(this);
this.renderInventory = this.renderInventory.bind(this);
// this.addItem = this.addItem.bind(this);
};

// getInventory() {
//   let candles = {...this.props.inventoryObject}
//   console.log(`candles yay +:+:+ ${JSON.stringify(candles)}`)
// }

renderInventory() {
  const candles = {...this.props.inventoryObject};
  const candleElements = [];
  const {addToCart} = this.props;

  for(let key in candles) {
    let candle = candles[key]
    // console.log(`here is candle loop ${JSON.stringify(candle)}`)

    candleElements.push(
      <div className="candle-item" key={key}>
      <h3>{candle.name}</h3>
      <img className="candle-image" src={candle.image}></img>
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
    return(
      <div>
        <div id="candle-home">
          <h1 id="header-home">Set the mood for code.</h1>
        </div>
        {this.renderInventory()}
      </div>
    );
  };
};

export default Home;
