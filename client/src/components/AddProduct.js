import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"

import axios from "axios"

import { SERVER_HOST } from "../config/global_constants"


export default class AddCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            category: "",
            price: 0,
            description: "",
            rating: 0.0,
            noOfReviews: 0,
            stockQuantity: 0,
            productImg: "",
            redirectToProducts: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        const productObject = {
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
            description: this.state.description,
            rating: this.state.rating,
            noOfReviews: this.state.noOfReviews,
            stockQuantity: this.state.stockQuantity,
            productImgs: this.state.productImg
        }

        axios.post(`${SERVER_HOST}/products`, productObject)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Record added")
                        this.setState({ redirectToProducts: true })
                    }
                }
                else {
                    console.log("Record not added")
                }
            })
    }


    render() {
        return (
            <div className="product-form-container">
                {this.state.redirectToProducts ? <Redirect to="/" /> : null}

                <form noValidate={true}>
                    <div id="website-title">
                        <div id="superments">
                            <p className="title" id="super">SUPER</p>
                            <p className="title">MENTS</p>
                        </div>
                        <div>
                            <img src="/images/website-logo.jpg" className="website-logo" />
                        </div>
                    </div>
                    <div className="input-section">
                        <p className="title">ADD PRODUCT</p>
                        <div className="input-form-container">
                            <div className="input">
                                <p className="input-header">Name</p>
                                <input
                                    className="input-field"
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    style={this.state.submittedOnce && this.state.name === "" ? { border: "thin solid red" } : {}}
                                />
                                {this.state.submittedOnce && this.state.name === "" && (
                                    <p className="empty-input">Please fill out this form</p>
                                )}
                            </div>
                            <div className="input-row-container">
                                <div className="input">
                                    <p className="input-header">Category</p>
                                    <input
                                        className="input-field-small"
                                        name="category"
                                        type="text"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && (this.state.category === "") ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.category === "" && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                                <div className="input">
                                    <p className="input-header">Price</p>
                                    <input
                                        className="input-field-small"
                                        name="price"
                                        type="number"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && (this.state.price === null) ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.price === null && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                            </div>
                            <div className="input">
                                <p className="input-header">Description</p>
                                <input
                                    className="input-field"
                                    name="description"
                                    type="text"
                                    onChange={this.handleChange}
                                    style={this.state.submittedOnce && (this.state.description === "") ? { border: "thin solid red" } : {}}
                                />
                                {this.state.submittedOnce && this.state.description === "" && (
                                    <p className="empty-input">Please fill out this form</p>
                                )}
                            </div>
                            <div className="input-row-container">
                                <div className="input">
                                    <p className="input-header">Rating</p>
                                    <input
                                        className="input-field-small"
                                        name="price"
                                        type="number"
                                        value={this.state.rating}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && (this.state.rating === null) ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.rating === null && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                                <div className="input">
                                    <p className="input-header">Reviews No.</p>
                                    <input
                                        className="input-field-small"
                                        name="noOfReviews"
                                        type="number"
                                        value={this.state.noOfReviews}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && (this.state.noOfReviews === null) ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.noOfReviews === null && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                            </div>
                            <div className="input-row-container">
                                <div className="input">
                                    <p className="input-header">Stock Quantity</p>
                                    <input
                                        className="input-field-small"
                                        name="stockQuantity"
                                        type="number"
                                        value={this.state.stockQuantity}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && (this.state.stockQuantity === null) ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.stockQuantity === null && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                                <div className="input">
                                    <p className="input-header">Main image</p>
                                    <input
                                        className="input-field-small"
                                        name="productImg"
                                        type="number"
                                        value={this.state.stockQuantity}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && (this.state.stockQuantity === null) ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.stockQuantity === null && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div id="action-buttons">
                            <button className="submit-button" onClick={this.handleSubmit}>ADD PRODUCT</button>
                            <Link to={"/"}><button className="cancel-button">CANCEL</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}