import React, {Component} from 'react'

export default class FeaturedProducts extends Component {
    render() {
        return (
            <div id="featured-products-container">
                <p className="subheading">FEATURED PRODUCTS</p>
                <div id="featured-products-gallery">
                    {this.props.products.map(product => 
                        <div className="featured-product" key={ product["id"] }>
                            <div className="product-image-container">
                                {product["productImgs"].map(img => 
                                    <div className="product-image" key={ img } style={{backgroundImage: `url(${img})`}}>
                                        <div><p>&#77946;</p></div>
                                    </div>
                                )}
                            </div>
                            <div className="product-details">
                                <p className="product-name">{product["name"]}</p>
                                <p className="product-price">€{product["price"]}.99</p>
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