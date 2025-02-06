import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom/cjs/react-router-dom.js"

import "./css/App.css"
import Home from "./components/Home"
import NoSuchPage from "./components/NoSuchPage"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/nosuchpage" component={NoSuchPage} />
                </Switch>

                <Footer />
            </BrowserRouter>
        )
    }
}