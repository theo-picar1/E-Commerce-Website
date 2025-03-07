import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"

import axios from "axios"

import { ACCESS_LEVEL_ADMIN } from "../config/global_constants"

import { SERVER_HOST } from "../config/global_constants"


export default class EditProduct extends Component {
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
            redirectToProducts: localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }

    componentDidMount() {
        // This is to find the product in the DB (by id) and put its values in the input fields
        // handleSubmit is where the editing happens
        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        this.setState({
                            name: res.data.name,
                            category: res.data.category,
                            price: res.data.price,
                            description: res.data.description,
                            rating: res.data.rating,
                            noOfReviews: res.data.noOfReviews,
                            stockQuantity: res.data.stockQuantity
                        })
                    }
                }
                else {
                    console.log(`Record not found`)
                }
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // This is where the actual editing happens
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

        // Finds the product with matching id in the DB
        // Also passing the new values as an object so you don't have to do /:email/:price/:etc
        axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, productObject, { headers: { "authorization": localStorage.token } })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log(`Record updated`)
                        this.setState({ redirectToProducts: true })
                    }
                }
                else {
                    console.log(`Record not updated`)
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
                        <p className="title">EDIT PRODUCT</p>
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
                                        min="1"
                                        max="1000000"
                                        step="100"
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
                                        name="rating"
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.5"
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
                                        min="1"
                                        max="100000"
                                        step="10"
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
                                        min="1"
                                        max="10000"
                                        step="1"
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
                            <button className="submit-button" onClick={this.handleSubmit}>SAVE CHANGES</button>
                            <Link to={"/"}><button className="cancel-button">CANCEL</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}