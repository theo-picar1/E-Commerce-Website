import React, { Component } from "react"

import Header from "./Header.js"
import Filters from "./Filters.js"
import ProductsGallery from "./ProductsGallery.js"
import ProductDetails from "./ProductDetails.js"
import Footer from "./Footer.js"
import UsersTable from "./UsersTable.js"
import UserFilters from "./UserFilters.js"
import ShoppingCartSidebar from "./ShoppingCartSidebar.js"

import axios from "axios"

import { SERVER_HOST } from "../config/global_constants.js"

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      originalProducts: [],
      categories: [],
      cartCounter: 0,
      sortBy: ``,
      sortType: ``,
      showProductDetails: false,
      product: [],
      checkedInstruments: [],
      searchValue: "",
      users: [],
      originalUsers: [],
      showCustomers: false,
      showProducts: true,
      loggedInUser: null,
      cartVisibility: false,
    }
  }

  componentDidMount() {
    axios.get(`${SERVER_HOST}/products`)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("Products have been successfully retrieved/read")

            let categories = []

            res.data.forEach((product) => {
              if (product["category"]) {
                categories.push(product["category"])
              }
            })

            let uniqueCategories = [...new Set(categories)]

            this.setState({
              products: res.data,
              originalProducts: res.data,
              categories: uniqueCategories,
            })
          }
        }
      })
      .catch((err) => {
        console.log("Error getting products:" + err)
      })

    if (localStorage.getItem("user")) {
      const user = localStorage.getItem("user")

      if (user) {
        this.setState({ loggedInUser: JSON.parse(user) }, () =>
          this.incrementCartCounter()
        )
      } else {
        this.createNonLoggedInUser()
      }
    } else {
      console.log("you are logged in")
    }

    axios
      .get(`${SERVER_HOST}/users`)
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("Users have been successfully retrieved")

            this.setState({
              users: res.data,
              originalUsers: res.data,
            })

            const userId = localStorage.id

            if (userId) {
              const loggedInUser = res.data.find((user) => user._id === userId)

              this.setState(
                {
                  users: res.data,
                  originalUsers: res.data,
                  loggedInUser: loggedInUser,
                },
                () => {
                  this.incrementCartCounter()
                }
              )
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err)
      })
  }

  incrementCartCounter = () => {
    if (!this.state.loggedInUser) {
      this.setState((prevState) => ({ cartCounter: prevState.cartCounter + 1 }))
      return
    }

    this.setState({
      cartCounter: this.state.loggedInUser.cart.length,
    })
  }

  sortProducts = (sortBy, sortType) => {
    let updatedProducts = [...this.state.products]

    if (sortType === "asc") {
      updatedProducts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
    } else if (sortType === "desc") {
      updatedProducts.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1))
    }

    this.setState({
      products: updatedProducts,
    })
  }

  setSortAttribute = (e) => {
    let array = e.target.value.split("-")

    let sortBy = array[0]
    let sortType = array[1]

    this.sortProducts(sortBy, sortType)
  }

  scrollToTop = () => {
    const topOfPage = document.getElementById("top-of-page")
    topOfPage.scrollIntoView({ behavior: "smooth" })
  }

  handleProductClick = (product) => {
    this.setState(
      {
        product,
        showProductDetails: true,
      },
      () => {
        this.scrollToTop()
      }
    )
  }

  removeProductFromUnLoggedUserCart = (product) => {
    let user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      console.error("No guest user found. Cannot remove product.")
      return
    }

    const productIndex = user.cart.findIndex(
      (cartProduct) => cartProduct.name === product.name
    )

    if (productIndex === -1) {
      console.error("Product not found in cart.")
      return
    }

    user.cart.splice(productIndex, 1)

    localStorage.setItem("user", JSON.stringify(user))

    console.log("Product quantity decreased or removed from cart successfully")

    this.setState(
      (prevState) => ({
        loggedInUser: user,
        cartCounter: user.cart.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      }),
      () => {
        this.incrementCartCounter()
      }
    )
  }

  deleteProductFromCart = (product) => {
    if (this.state.loggedInUser._id == "guest") {
      this.removeProductFromUnLoggedUserCart(product)
      return
    }
    const userId = localStorage.id

    if (!userId) {
      console.error("User ID not found in session storage")
      return
    }

    axios
      .delete(`${SERVER_HOST}/users/cart`, {
        data: { userId, product },
      })
      .then((response) => {
        if (response.data.errorMessage) {
          console.log(response.data.errorMessage)
        } 
        else {
          console.log("Product has been successfully removed from cart")

          this.setState((prevState) => {
            const loggedInUser = { ...prevState.loggedInUser }
            const cart = [...loggedInUser.cart]

            const indexToRemove = cart.findIndex(
              (item) => item.name === product.name
            )

            if (indexToRemove === -1) {
              console.log("Product not found in client-side cart")
              return prevState
            }

            cart.splice(indexToRemove, 1)
            loggedInUser.cart = cart

            return { loggedInUser, cartCounter: cart.length }
          })
        }
      })
      .catch((err) => {
        console.error("Error removing product from cart:", err)
      })
  }

  closeProductDetails = () => {
    this.setState({ showProductDetails: false, product: null })
  }

  handleFilterChange = ({ checkedInstruments = [], price, minRating, maxRating }) => {
    this.setState({
      checkedInstruments: Array.isArray(checkedInstruments) ? checkedInstruments : [],
      price: price ?? 150000,
      minRating: minRating ?? 0,
      maxRating: maxRating ?? 5
    }, this.applyFilters)
  }


  handleSearch = (searchValue) => {
    this.setState({ searchValue }, () => {
      this.applyFilters()
    })
  }

  applyFilters = () => {
    const { searchValue, checkedInstruments, originalProducts, price, minRating, maxRating } = this.state

    if (!originalProducts || originalProducts.length === 0) {
      console.error("No products available for filtering.")
      return
    }

    let min = parseFloat(minRating) || 0
    let max = parseFloat(maxRating) || 5

    let filteredProducts = originalProducts
      .filter(product => !searchValue || product.name.toLowerCase().includes(searchValue.toLowerCase()))
      .filter(product => !checkedInstruments.length || checkedInstruments.includes(product.category))
      .filter(product => !price || product.price <= price)
      .filter(product => product.rating >= min && product.rating <= max)

    this.setState({ products: filteredProducts })
  }

  showCustomerTable = () => {
    this.setState({
      showCustomers: true,
    })
  }

  showProducts = () => {
    this.setState({
      showCustomers: false,
    })
  }

  addProductToUnLoggedUserCart = (product) => {
    let user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      console.error("No guest user found. Creating one...")
      this.createNonLoggedInUser()
      user = JSON.parse(localStorage.getItem("user"))
    }

    user.cart.push(product)

    localStorage.setItem("user", JSON.stringify(user))

    console.log("Product added to cart successfully")

    this.setState(
      (prevState) => ({
        loggedInUser: user,
        cartCounter: user.cart.length,
      }),
      () => {
        this.incrementCartCounter()
      }
    )
  }

  addProductToCart = (product) => {
    if (this.state.loggedInUser._id === "guest") {
      this.addProductToUnLoggedUserCart(product)
      return
    }
    const userId = localStorage.id

    if (!userId) {
      alert("User not logged in")
      return
    }

    axios
      .post(`${SERVER_HOST}/users/cart`, { userId, product })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            alert(res.data.errorMessage)
          } else {
            console.log("Product added to cart successfully")

            const updatedCart = res.data.cart
            this.setState(
              (prevState) => ({
                loggedInUser: {
                  ...prevState.loggedInUser,
                  cart: updatedCart,
                },
              }),
              () => {
                this.incrementCartCounter()
              }
            )
          }
        }
      })
      .catch((err) => {
        console.error("Error:", err)
      })
  }

  updateLocalCart = (userId, product) => {
    const updatedUsers = this.state.users.map((user) => {
      if (user._id === userId) {
        const updatedCart = [...user.cart]

        const productIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        )

        if (productIndex !== -1) {
          updatedCart[productIndex].quantity += 1
        } else {
          updatedCart.push({
            ...product,
            quantity: 1,
          })
        }

        return { ...user, cart: updatedCart }
      }
      return user
    })

    this.setState(
      {
        users: updatedUsers,
        originalUsers: updatedUsers,
      },
      () => {
        this.incrementCartCounter()
      }
    )
  }

  createNonLoggedInUser = () => {
    const user = {
      _id: "guest",
      firstName: "Guest",
      secondName: "User",
      email: "",
      password: "",
      houseAddress: "",
      telephoneNo: "",
      accessLevel: parseInt(process.env.ACCESS_LEVEL_USER) || 1,
      profilePhotoFilename: "",
      cart: [],
    }

    localStorage.setItem("user", JSON.stringify(user))

    this.setState({ loggedInUser: user })
  }

  toggleCartVisibility = () => {
    if (!this.state.loggedInUser) {
      this.createNonLoggedInUser()
    }

    this.setState((prev) => ({ cartVisibility: !prev.cartVisibility }))
  }

  render() {
    const {
      searchValue,
      showProductDetails,
      cartCounter,
      categories,
      products,
      product,
      loggedInUser,
      cartVisibility,
    } = this.state
    const {
      incrementCartCounter,
      setSortAttribute,
      handleProductClick,
      closeProductDetails,
      addProductToCart,
      deleteProductFromCart,
    } = this


    return (
      <div className="page-content">
        <div id="top-of-page"></div>

        {loggedInUser ? (
          <ShoppingCartSidebar
            products={loggedInUser.cart}
            addProductToCart={this.addProductToCart}
            cartVisibility={cartVisibility}
            toggleCartVisibility={this.toggleCartVisibility}
            deleteProductFromCart={deleteProductFromCart}
          />
        ) : null}

        <Header
          cartCounter={cartCounter}
          onSearch={this.handleSearch}
          searchValue={searchValue}
          showCustomersOnClick={this.showCustomerTable}
          showProductsOnClick={this.showProducts}
          showCustomers={this.state.showCustomers}
          toggleCartVisibility={this.toggleCartVisibility}
        />
        {showProductDetails ? (
          <ProductDetails
            product={product}
            closeProductDetails={closeProductDetails}
            incrementCartCounter={incrementCartCounter}
            addProductToCart={addProductToCart}
          />
        ) : (
          <>
            {!this.state.showCustomers ? (
              <div id="products-main-content">
                <Filters
                  categories={categories}
                  onFilterChange={this.handleFilterChange}
                />
                <ProductsGallery
                  products={products}
                  incrementCartCounter={incrementCartCounter}
                  onSort={setSortAttribute}
                  handleProductClick={handleProductClick}
                  addProductToCart={addProductToCart}
                />
              </div>
            ) : (
              <div id="users-main-content">
                <UserFilters users={this.state.users} />
                <UsersTable users={this.state.users} />
              </div>
            )}
          </>
        )}
        <Footer />
      </div>
    )
  }
}
