import React, {Component} from 'react'

export default class FeaturedProducts extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            products: [],
            originalProducts: [],
            productKeys: []
        }
    }
               
    componentDidMount() {
        let url = "json/products.json"

        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                let keys = []

                jsonData.forEach(product => {
                    // just to get all keys from products.json because first object might not have all the keys or different keys from other objects
                    keys.push(...Object.keys(product))
                })

                // then get rid of duplicates, because I pushed EVERY single key and tag from EVERY product
                let uniqueKeys = [...new Set(keys)]
                
                this.setState({
                    products: jsonData,
                    originalProducts: jsonData,
                    productKeys: uniqueKeys,
                })
            })
    }

    render() {
        return (
            <div id="featured-products-container">
                <p className="subheading">FEATURED PRODUCTS</p>
                <div id="featured-products-gallery">
                    {this.state.products.map(product => 
                        <div className="featured-product">
                            <div className="product-image" style={{backgroundImage: `url(${product["productImgs"][0]})`}}>
                                <div><p>&#77946;</p></div>
                            </div>
                            <div className="product-details">
                                <p className="product-name">{product["name"]}</p>
                                <p className="product-price">€{product["price"]}</p>
                                <button className="shop-now-button">
                                    <img src="/images/shopping-cart.png"/>
                                    <p>ADD TO CART</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}