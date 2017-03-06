#Hacker Candle
##Project 4 - Chris Wilkening

App will be live soon!

![image of app](http://i.imgur.com/WWeNTdR.png)

###Technologies
####To make this app I used:
- React
- Express
- Axios
- Firebase
- JavaScript
- Bootstrap
- HTML | JSX
- Stripe

###Take a look:

```
renderCart() {
    const cart = {...this.props.cart}; // grab the cart state
    const candle = {...this.props.inventoryObject}; //grab the candle inventory state
    var cartElements = []; //set empty array
      for(let key in cart) { //loop through the cart
        let item = cart[key]; //set item to the value of each key
        //push the items into empty array
        cartElements.push(
          <div className="cart-item" key={key}>
            <img className="cart-image" src={candle[key].image}></img>
            <div className="cart-container">
              <h4 className="cart-name">{candle[key].name}</h4>
              <p>price/candle: ${candle[key].price}</p>
              <p>scent: {candle[key].scent}</p>
            </div>
            <div className="quant-cont">
          <p className="quantity">quantity:</p>
          { this.props.cart[key] === null || isNaN(this.props.cart[key])
          //if the cart is empty set the default value to one, else set it to item.
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
      }
      //return the elements
      return (
        <div>
        {cartElements}
        </div>
      )
  }
```

###My Approach
The idea to build an e-commerce app came early to me during my time at General Assembly, but I didn't know what to sell. I chose to make candles and sell a real product, instead of building a site just for demonstration purposes. I whiteboarded the user flow of the app to help me choose the best way to structure the checkout process. I used Trello to structure the workflow.

###Dependencies
- React Stripe Checkout
- Express
- dotenv
- axios
- react-router-dom
- history

Run ```npm install``` for the root folder and client.

###For the Future

- Go live with Hackercandle.com.
- Add database for purchases and e-mail.
- Add user accounts.
- Add Facebook/Google auth.
- Add subscription service with Stripe.

####Written by Chris Wilkening
