import React, { Component } from 'react';
// import Header from './Header';

class Home extends Component {

constructor(props) {
  super(props);
// this.getInventory = this.getInventory.bind(this);
this.renderInventory = this.renderInventory.bind(this);
}

// getInventory() {
//   let candles = {...this.props.inventoryObject}
//   console.log(`candles yay +:+:+ ${JSON.stringify(candles)}`)
// }

renderInventory() {
let candles = {...this.props.inventoryObject}
let candleElements = [];

  for(let key in candles) {
    let candle = candles[key]
    console.log(candle)

    candleElements.push(
      <div className="candle-item" key={key}>
      <h4>{candle.name}</h4>
      <img src="http://placehold.it/250x250"></img>
      <p>${candle.price}</p>
      <p>scent: {candle.scent}</p>
      <button>Add to Cart</button>
      </div>
    )
    candleElements.reverse();
  }
  return (
    <div>
    {candleElements}
    </div>
  )
}

  render() {
    return(
      <div>
      <div id="candle-home">
        <h1 id="header-home">Set the mood for code.</h1>
      </div>
      {this.renderInventory()}
      </div>
    );
  }
}

export default Home;
