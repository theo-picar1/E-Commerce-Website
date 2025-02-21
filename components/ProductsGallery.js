import React, { Component } from "react";

export default class FeaturedProducts extends Component {
    render() {
        return (
            <div id="products-gallery-container">
                <div id="products-gallery-header">
                    <p className="subheading">FEATURED PRODUCTS</p>
                    <select onChange={this.props.onSort}>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-desc">Highest Price</option>
                        <option value="price-asc">Lowest Price</option>
                        <option value="rating-desc">Highest Rating</option>
                        <option value="rating-asc">Lowest Rating</option>
                    </select>
                </div>
                <div id="products-gallery">
                    {this.props.products.map((product) => (
                        <div className="product" key={product["id"]}>
                            <div className="product-image-container">
                                {product["productImgs"].map((img) => (
                                    <div
                                        className="product-image"
                                        key={img}
                                        style={{ backgroundImage: `url(${img})` }}
                                        onClick={() => this.props.handleProductClick(product)}
                                    >
                                        <div>
                                            <p>&#77946;</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="product-details">
                                <p className="product-name">{product["name"]}</p>
                                <p className="product-price">€{product["price"]}.99</p>
                                <button
                                    className="shop-now-button"
                                    onClick={this.props.incrementCartCounter}
                                >
                                    <img src="/images/shopping-cart.png" />
                                    <p>ADD TO CART</p>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
