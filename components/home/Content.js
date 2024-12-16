import React, {Component} from "react"

import ProductsGallery from "./ProductsGallery"
import FeaturedProducts from "./FeaturedProducts"

export default class Content extends Component {
    render() {
        return (
            <div id="content"> 
                <ProductsGallery /> 
                <FeaturedProducts />
            </div>         
        )
    }
}