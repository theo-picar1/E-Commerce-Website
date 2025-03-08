import React, { Component } from "react"
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.js"

import "./css/App.css"
import Home from "./components/Home"
import NoSuchPage from "./components/NoSuchPage"
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddProduct from "./components/AddProduct"
import DeleteProduct from "./components/DeleteProduct"
import EditProduct from "./components/EditProduct"
import PurchaseHistory from "./components/PurchaseHistory"
import BuyProducts from "./components/BuyProducts"
import PayPalMessage from "./components/PayPalMessage"

import { ACCESS_LEVEL_GUEST } from "./config/global_constants"

if (typeof localStorage.accessLevel === "undefined") {
  localStorage.accessLevel = ACCESS_LEVEL_GUEST
  localStorage.token = null
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/nosuchpage" component={NoSuchPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/delete-product/:id" component={DeleteProduct} />
          <Route exact path="/edit-product/:id" component={EditProduct} />
          <Route exact path="/BuyProducts/:id" component={BuyProducts} />
          <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage} />
          <Route exact path="/PurchaseHistory" component={PurchaseHistory} />
          <Route path="*" component={NoSuchPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}
