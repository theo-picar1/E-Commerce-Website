import React, { Component } from "react"
import { Link } from "react-router-dom"

class ShoppingCartSidebar extends Component {
  state = {
    cartItems: [],
  }

  componentDidMount() {
    this.processCartItems()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.processCartItems()
    }
  }

  processCartItems = () => {
    const cartItems = {}

    this.props.products.forEach((product) => {
      const productname = product.name
      const price = product.price

      if (cartItems[productname]) {
        cartItems[productname].quantity += 1
      } else {
        cartItems[productname] = {
          ...product,
          quantity: 1,
          price: price,
          image:
            product.productImgs && product.productImgs[0]
              ? product.productImgs[0]
              : "/images/default-image.png",
        }
      }
    })

    const itemsArray = []
    for (const key in cartItems) {
      itemsArray.push(cartItems[key])
    }

    this.setState({ cartItems: itemsArray })
  }

  handleRemoveItem = (id) => {
    this.setState((prev) => ({
      cartItems: prev.cartItems.filter((item) => item.id !== id),
    }))
  }

  getTotalPrice = () => {
    return this.state.cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  render() {
    const { cartItems } = this.state
    const { cartVisibility, toggleCartVisibility, deleteProductFromCart } =
      this.props

    return (
      <div>
        {cartVisibility && (
          <div className="cartSidebar">
            <button className="closeBtn" onClick={() => toggleCartVisibility()}>
              ✖
            </button>
            <h2>Your Cart</h2>

            <div className="cartItems">
              {cartItems.length === 0 ? (
                <p className="emptyCartMsg">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cartItem">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cartItemImg"
                    />
                    <div className="cartItemDetails">
                      <div className="cartItemName">{item.name}</div>
                      <div className="cartItemPrice">
                        €{item.price.toFixed(2)} × {item.quantity}
                      </div>
                    </div>
                    <button
                      className="removeBtn"
                      onClick={() => deleteProductFromCart(item)}
                    >
                      ✖
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="cartTotal">Total: €{this.getTotalPrice()}</div>
            <div>
              <Link to="/payPage">
                <button>Go to Pay Page</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ShoppingCartSidebar
