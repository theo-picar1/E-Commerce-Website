import React, {Component} from "react"

import Header from "./Header.js"
import Content from "./Content.js"
import Footer from "./Footer.js"

export default class ECommerceForm extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        )
    }
}