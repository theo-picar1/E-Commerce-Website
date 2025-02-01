import React, {Component} from "react"

import Toolbar from "../components/home/Toolbar.js"
import Filters from "../components/home/Filters.js"
import ProductsGallery from "../components/home/ProductsGallery.js"

import axios from "axios"

import { SERVER_HOST } from "../config/global_constants.js"

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            originalProducts: [],
            categories: []
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then(res => {
            if(res.data) {

                if(res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                }
                else {
                    console.log("Products have been successfully retrieved/read")

                    let categories = []

                    res.data.forEach(product => {
                        if(product["category"]) {
                            categories.push(product["category"])
                        }
                    })

                    let uniqueCategories = [...new Set(categories)]
                    
                    this.setState({
                        products: res.data,
                        originalProducts: res.data,
                        categories: uniqueCategories
                    })
                }
            }
        })
    }           
    
    render() {
        return (
            <div className="page-content">
                <Toolbar />
                <Filters categories={ this.state.categories }/>
                <ProductsGallery products={ this.state.products } onClick={ this.incrementCartCounter }/>
            </div>
        )
    }
}