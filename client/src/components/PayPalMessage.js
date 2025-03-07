import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"

export default class PayPalMessage extends Component {
    static messageType = {
        SUCCESS: "success",
        ERROR: "error",
        CANCEL: "cancel"
    }

    constructor(props) {
        super(props)

        this.state = {
            redirectToProductsPage: false,
            buttonColour: "red-button"
        }
    }


    componentDidMount() {
        if (this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS) {
            this.setState({
                heading: "PAYPAL TRANSACTION CONFIRMATION",
                message: "Your PayPal transaction was successful.",
                buttonColour: "green-button"
            })
        }
        else if (this.props.match.params.messageType === PayPalMessage.messageType.CANCEL) {
            this.setState({
                heading: "PAYPAL TRANSACTION CANCELLED",
                message: "You cancelled your PayPal transaction. Therefore, the transaction was not completed."
            })
        }
        else if (this.props.match.params.messageType === PayPalMessage.messageType.ERROR) {
            this.setState({
                heading: "PAYPAL TRANSACTION ERROR",
                message: "An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again."
            })
        }
        else {
            console.log("The 'messageType' prop that was passed into the PayPalMessage component is invalid. It must be one of the following: PayPalMessage.messageType.SUCCESS, PayPalMessage.messageType.CANCEL or PayPalMessage.messageType.ERROR")
        }
    }


    render() {
        return (
            <div className="paypal-message-container">
                {this.state.redirectToProductsPage ? <Redirect to="/" /> : null}

                <div className="paypal-content">
                    <div id="website-title">
                        <div id="superments">
                            <p className="title" id="super">SUPER</p>
                            <p className="title">MENTS</p>
                        </div>
                        <div>
                            <img src="/images/website-logo.jpg" className="website-logo" />
                        </div>
                    </div>
                    <div className="message-content">
                        <p className="message-header">{this.state.heading}</p>
                        <p className="message">{this.props.match.params.message}</p>
                        <p>{this.state.message}</p>
                        {this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS ? <p>Your PayPal payment confirmation is <span id="payPalPaymentID">{this.props.match.params.payPalPaymentID}</span></p> : null}
                        <Link className={this.state.buttonColour} to={"/"}><button>CONTINUE</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}