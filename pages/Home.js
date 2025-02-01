import React, {Component} from "react"

import Toolbar from "../components/home/Toolbar.js"
import Filters from "../components/home/Filters.js"
import FeaturedProducts from "../components/home/FeaturedProducts.js"

export default class Home extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            products: [],
            originalProducts: [],
            productKeys: [],
            categories: [],
            cartCounter: []
        }
    }
               
    componentDidMount() {
        let url = "json/products.json"

        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                let keys = []
                let categories = []

                jsonData.forEach(product => {
                    keys.push(...Object.keys(product))

                    if(product["category"]) {
                        categories.push(product["category"])
                    }
                })

                let uniqueKeys = [...new Set(keys)]
                let uniqueCategories = [...new Set(categories)]
                
                this.setState({
                    products: jsonData,
                    originalProducts: jsonData,
                    productKeys: uniqueKeys,
                    categories: uniqueCategories
                })
            })
    }

    incrementCartCounter() {
        let newCounter = this.state.cartCounter + 1

        this.setState({
            cartCounter: newCounter
        },
            console.log(this.state.cartCounter)
        )
    }
    
    render() {
        return (
            <div className="page-content">
                <Toolbar />
                <Filters categories={ this.state.categories }/>
                <FeaturedProducts products={ this.state.products } onClick={ this.incrementCartCounter }/>
            </div>
        )
    }
}