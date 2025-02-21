import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.js"

import "./css/App.css"
import Home from "./components/Home"
import NoSuchPage from "./components/NoSuchPage"
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import UsersTable from "./components/UsersTable"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


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
                    <Route exact path="/users" component={UsersTable} />
                    <Route path="*" component={NoSuchPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}