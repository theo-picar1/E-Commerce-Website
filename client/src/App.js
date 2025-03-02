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
import PayPage from "./components/PayPage"
import AddProduct from "./components/AddProduct"
import DeleteProduct from "./components/DeleteProduct"
import EditProduct from "./components/EditProduct"

import { ACCESS_LEVEL_GUEST } from "./config/global_constants"

if (typeof sessionStorage.accessLevel === "undefined") {
  sessionStorage.name = "GUEST"
  sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
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
          <Route exact path="/payPage" component={PayPage} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/delete-product/:id" component={DeleteProduct} />
          <Route exact path="/edit-product/:id" component={EditProduct} />
          <Route path="*" component={NoSuchPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}
