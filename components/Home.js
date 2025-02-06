import React, {Component} from "react"

import Toolbar from "./Toolbar.js"
import Filters from "./Filters.js"
import ProductsGallery from "./ProductsGallery.js"

import axios from "axios"

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
            sortType: ``
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
    
    incrementCartCounter = () => {
        this.setState(prevState => ({ cartCounter: prevState.cartCounter + 1 }))
    }

    sortProducts = (sortBy, sortType) => {
        let updatedProducts = [...this.state.products]

        if(sortType === "asc") {
            updatedProducts.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
        }
        else if(sortType === "desc") {
            updatedProducts.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
        }

        this.setState({
            products: updatedProducts
        })
    }

    setSortAttribute = (e) => {
        let array = e.target.value.split('-')

        let sortBy = array[0]
        let sortType = array[1]

        this.sortProducts(sortBy, sortType)
    }

    
    render() {
        return (
            <div className="page-content">
                <Toolbar cartCounter={ this.state.cartCounter }/>
                <div id="main-content">
                    <Filters categories={ this.state.categories }/>
                    <ProductsGallery products={ this.state.products } onClick={ this.incrementCartCounter } onSort={ this.setSortAttribute }/>
                </div>
            </div>
        )
    }
}