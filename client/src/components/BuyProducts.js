import React, { Component } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"


export default class BuyCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToPayPalMessage: false,
            messageType: null,
            orderID: null
        }
    }


    createOrder = (data, actions) => {
        return actions.order.create({ purchase_units: [{ amount: { value: this.props.totalPrice } }] })
    }


    onApprove = paymentData => {
        axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.carID}/${this.props.totalPrice}`, { headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
            .then(res => {
                this.setState({
                    messageType: PayPalMessage.messageType.SUCCESS,
                    orderID: paymentData.orderID,
                    redirectToPayPalMessage: true
                })
            })
            .catch(errorData => {
                this.setState({
                    messageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true
                })
            })
    }


    onError = errorData => {
        this.setState({
            messageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true
        })
    }


    onCancel = cancelData => {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        this.setState({
            messageType: PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage: true
        })
    }


    render() {
        return (
            <div>
                {this.state.redirectToPayPalMessage ? <Redirect to={`/PayPalMessage/${this.state.messageType}/${this.state.orderID}`} /> : null}

                <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
                    <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
                </PayPalScriptProvider>
            </div>
        )
    }
}