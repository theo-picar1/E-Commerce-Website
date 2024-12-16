import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.js"

import "./css/App.css"
import Home from "./pages/Home"
import NoSuchPage from "./pages/NoSuchPage"
import Header from "./components/Header"

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/nosuchpage" component={NoSuchPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}