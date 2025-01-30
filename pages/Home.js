import React, {Component} from "react"

import Toolbar from "../components/home/Toolbar.js"
import Filters from "../components/home/Filters.js"
import FeaturedProducts from "../components/home/FeaturedProducts.js"

export default class Home extends Component {
    render() {
        return (
            <div className="page-content">
                <Toolbar />
                <Filters />
                <FeaturedProducts />
            </div>
        )
    }
}