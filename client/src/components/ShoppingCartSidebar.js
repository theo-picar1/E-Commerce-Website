import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cartItems: [],
    }
  }

  componentDidMount() {
    if (this.props.products) {
      this.processCartItems()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.products && prevProps.products !== this.props.products) {
      this.processCartItems()
    }
  }

  processCartItems = () => {
    const cartItems = {}

    this.props.products.forEach((product) => {
      const productName = product.name
      const price = product.price

      if (cartItems[productName]) {
        cartItems[productName].quantity += 1
      } else {
        cartItems[productName] = {
          ...product,
          quantity: 1,
          price: price,
          image: product.productImgs[0],
        }
      }
    })

    const itemsArray = Object.values(cartItems)

    this.setState({ cartItems: itemsArray })
  }

  calculateSubtotal = () => {
    return this.state.cartItems
      .reduce((acc, product) => acc + product.price * product.quantity, 0)
      .toFixed(2)
  }

  getTotalPrice = () => {
    return this.calculateSubtotal()
  }

  render() {
    if (this.props.cartVisibility === false) return null
    return (
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>SHOPPING CART</h2>
          <button
            className="close-btn"
            onClick={this.props.toggleCartVisibility}
          >
            &times;
          </button>
        </div>
        <div className="cart-items-container">
          {this.props.products.length === 0 ? (
            <p className="emptyCartMsg">Your cart is empty.</p>
          ) : (
            this.state.cartItems.map((product) => (
              <div className="cart-item" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h4>{product.name}</h4>
                  <p>${product.price.toFixed(2)}</p>
                  <div className="quantity">
                    <button
                      className="qty-btn minus-btn"
                      onClick={() => this.props.deleteProductFromCart(product)}
                    >
                      -
                    </button>
                    <span className="qty-number">{product.quantity}</span>
                    <button
                      className="qty-btn plus-btn"
                      onClick={() => this.props.addProductToCart(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => this.props.deleteProductFromCart(product)}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="subtotal">
            <span>SUBTOTAL</span>
            <span id="subtotal">${this.calculateSubtotal()}</span>
          </div>
          <Link to="/payPage">
            <button className="checkout-btn">REVIEW &amp; PAY</button>
          </Link>
        </div>
      </div>
    )
  }
}
