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

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_USER } from "../config/global_constants.js"

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
      guestUserCreated: false,
    }
  }

  componentDidMount() {
    // Same logic as fetch. Get all products and set the state of products to be the response data
    axios.get(`${SERVER_HOST}/products`).then((res) => {
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

    // Same logic as getting products
    axios.get(`${SERVER_HOST}/users`).then((res) => {
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

    // So that guests can use shopping cart, we make a temporary user with just a generic id
    // If nothing is found, it is assumed that the user is already logged in
    if (!this.state.guestUserCreated) {
      console.log("you are not logged in")
      this.createNonLoggedInUser()
    } else {
      console.log("you are logged in")
    }
  }

  // Counter to show total items in shopping cart
  incrementCartCounter = () => {
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

  // Activates when user clicks on a product
  scrollToTop = () => {
    const topOfPage = document.getElementById("top-of-page")
    topOfPage.scrollIntoView({ behavior: "smooth" })
  }

  // Opens modal to show product details
  handleProductClick = (product) => {
    this.setState(
      {
        product,
        showProductDetails: true,
      },
      () => {
        // Scroll to the top of the page
        this.scrollToTop()
      }
    )
  }

  // Got JSON.stringify from https://www.w3schools.com/js/js_json_stringify.asp
  // Got JSON.parse from https://www.w3schools.com/js/js_json_parse.asp

  // Add product to guest user's cart
  addProductToUnLoggedUserCart = (product) => {
    // use JSON.parse to convert string to object as localStorage only stores strings
    let user = JSON.parse(localStorage.getItem("user"))

    // add product to cart
    user.cart.push(product)

    // use JSON.stringify to convert object to string as localStorage only stores strings
    localStorage.setItem("user", JSON.stringify(user))

    console.log("Product added to cart successfully")

    this.setState(
      {
        loggedInUser: user,
        cartCounter: user.cart.length,
      },
      () => {
        this.incrementCartCounter()
      }
    )
  }

  removeProductFromUnLoggedUserCart = (product) => {
    // use JSON.parse to convert string to object as localStorage only stores strings
    let user = JSON.parse(localStorage.getItem("user"))

    // Find the index of the product
    const productIndex = user.cart.findIndex(
      (cartProduct) => cartProduct.name === product.name
    )

    // removes the product from cart
    user.cart.splice(productIndex, 1)

    // use JSON.stringify to convert object to string
    // as localStorage only stores strings
    localStorage.setItem("user", JSON.stringify(user))

    this.setState(
      {
        loggedInUser: user,
        cartCounter: user.cart.length,
      },
      () => {
        this.incrementCartCounter()
      }
    )
  }

  addProductToCart = (product) => {
    // Check if user is guest
    if (this.state.loggedInUser._id === "guest") {
      // redirect to guest cart
      this.addProductToUnLoggedUserCart(product)
      return
    }

    // get user id from local storage
    const userId = localStorage.id

    // passes in user id and product
    axios.post(`${SERVER_HOST}/users/cart`, { userId, product })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("Product added to cart successfully")

            // update cart
            const updatedCart = res.data.cart

            this.setState(
              {
                loggedInUser: {
                  ...this.state.loggedInUser,
                  cart: updatedCart,
                },
              },
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

  deleteProductFromCart = (product) => {
    // Check if user is guest
    if (this.state.loggedInUser._id == "guest") {
      // redirect to guest cart
      this.removeProductFromUnLoggedUserCart(product)
      return
    }

    // get user id from local storage
    const userId = localStorage.id

    // passes in user id and product
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

          this.setState(() => {
            // makes a copy of the logged in user
            const loggedInUser = { ...this.state.loggedInUser }

            // makes a copy of the logged in user's cart
            const cart = [...loggedInUser.cart]

            // Find the index of the product to remove
            const indexToRemove = cart.findIndex(
              (item) => item.name === product.name
            )

            // Remove the product from the cart
            cart.splice(indexToRemove, 1)
            loggedInUser.cart = cart

            // update logged in user and cart counter
            return { loggedInUser, cartCounter: cart.length }
          })
        }
      })
      .catch((err) => {
        console.error("Error removing product from cart:", err)
      })
  }

  // Close product details modal
  closeProductDetails = () => {
    this.setState({ showProductDetails: false, product: null })
  }

  handleFilterChange = ({
    checkedInstruments = [],
    price,
    minRating,
    maxRating,
  }) => {
    this.setState(
      {
        checkedInstruments: Array.isArray(checkedInstruments)
          ? checkedInstruments
          : [],
        price: price ?? 150000,
        minRating: minRating ?? 0,
        maxRating: maxRating ?? 5,
      },
      this.applyFilters
    )
  }

  handleSearch = (searchValue) => {
    this.setState({ searchValue }, () => {
      this.applyFilters()
    })
  }

  applyFilters = () => {
    const {
      searchValue,
      checkedInstruments,
      originalProducts,
      price,
      minRating,
      maxRating,
    } = this.state

    if (!originalProducts || originalProducts.length === 0) {
      console.error("No products available for filtering.")
      return
    }

    let min = parseFloat(minRating) || 0
    let max = parseFloat(maxRating) || 5

    let filteredProducts = originalProducts
      .filter(
        (product) =>
          !searchValue ||
          product.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter(
        (product) =>
          !checkedInstruments.length ||
          checkedInstruments.includes(product.category)
      )
      .filter((product) => !price || product.price <= price)
      .filter((product) => product.rating >= min && product.rating <= max)

    this.setState({ products: filteredProducts })
  }

  handleSearchUsers = (searchValue) => {
    this.setState({ searchValue }, this.applyUserFilters)
  }

  applyUserFilters = () => {
    const { searchValue, originalUsers } = this.state

    if (!originalUsers || originalUsers.length === 0) {
      console.error("No users available for filtering.")
      return
    }

    // Ensure search input is valid (trim spaces and lowercase)
    const searchQuery = searchValue ? searchValue.trim().toLowerCase() : ""

    // If search is empty, reset to original users list
    if (!searchQuery) {
      console.log("Search is empty, resetting user list.")
      this.setState({ users: originalUsers })
      return
    }

    let filteredUsers = originalUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.secondName}`.toLowerCase() // Combine names
      return fullName.includes(searchQuery) // Search full name properly
    })

    console.log("Search Query:", searchQuery)
    console.log("Filtered Users:", filteredUsers)

    this.setState({ users: filteredUsers })
  }

  handleSortUsers = (sortOption) => {
    let sortedUsers = [...this.state.users]

    if (sortOption === "name-asc") {
      sortedUsers.sort((a, b) =>
        (a.firstName + " " + a.secondName).localeCompare(
          b.firstName + " " + b.secondName
        )
      )
    } else if (sortOption === "name-desc") {
      sortedUsers.sort((a, b) =>
        (b.firstName + " " + b.secondName).localeCompare(
          a.firstName + " " + a.secondName
        )
      )
    }

    this.setState({ users: sortedUsers })
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

  createNonLoggedInUser() {
    const user = {
      _id: "guest",
      firstName: "Guest",
      secondName: "User",
      email: "",
      password: "",
      houseAddress: "",
      telephoneNo: "",
      accessLevel: ACCESS_LEVEL_GUEST,
      profilePhotoFilename: "",
      cart: [],
    }

    localStorage.setItem("user", JSON.stringify(user))

    this.setState({ loggedInUser: user, guestUserCreated: true })
  }

  toggleCartVisibility = () => {
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
                <UserFilters
                  searchValue={this.state.searchValue}
                  onSearch={this.handleSearchUsers}
                  onSort={this.handleSortUsers}
                  users={this.state.users}
                />
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
