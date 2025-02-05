import React, {Component} from 'react'

export default class FeaturedProducts extends Component {
    render() {
        {console.log(this.props.products)}
        return (
            <div id="products-gallery-container">
                <div id="products-gallery-header">
                    <p className="subheading">FEATURED PRODUCTS</p>
                    <select>
                        <option>Highest Price</option>
                        <option>Lowest Price</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                    </select>
                </div>
                <div id="products-gallery">
                    {this.props.products.map(product => 
                        <div className="product" key={ product["id"] }>
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
                                <button className="shop-now-button" onClick={this.props.onClick}>
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