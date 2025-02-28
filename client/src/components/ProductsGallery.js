import React, { Component } from "react"
import { Link } from "react-router-dom"
import { ACCESS_LEVEL_GUEST } from "../config/global_constants"
import { SERVER_HOST } from "../config/global_constants"

import axios from "axios"

export default class ProductsGallery extends Component {
    // componentDidMount() {
    //     this.props.products["productImgs"].map(photo => {
    //         return axios.get(`${SERVER_HOST}/products/photo/${photo.filename}`)
    //             .then(res => {
    //                 if (res.data) {
    //                     if (res.data.errorMessage) {
    //                         console.log(res.data.errorMessage)
    //                     }
    //                     else {
    //                         document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
    //                     }
    //                 }
    //                 else {
    //                     console.log("Record not found")
    //                 }
    //             })
    //     })
    // }

    render() {
        return (
            <div id="products-gallery-container">
                <div id="products-gallery-header">
                    <p className="subheading">FEATURED PRODUCTS</p>
                    <div id="product-tools">
                        <select onChange={this.props.onSort}>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="price-desc">Highest Price</option>
                            <option value="price-asc">Lowest Price</option>
                            <option value="rating-desc">Highest Rating</option>
                            <option value="rating-asc">Lowest Rating</option>
                        </select>
                        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                            <Link to={"/add-product"}><button className="add-button">ADD PRODUCT</button></Link>
                            :
                            null}
                    </div>
                </div>
                <div id="products-gallery">
                    {this.props.products.map((product) => (
                        <div className="product" key={product._id}>
                            {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                                <div className="action-buttons">
                                    <Link to={"/edit-product/" + product._id}><button className="edit-button"><img src="images/edit-icon.png" className="website-icon" /></button></Link>
                                    <Link to={"/delete-product/" + product._id}><button className="delete-button"><img src="images/delete-icon.png" className="website-icon" /></button></Link>
                                </div>
                                :
                                null}
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
                                    className="add-to-cart-button"
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
