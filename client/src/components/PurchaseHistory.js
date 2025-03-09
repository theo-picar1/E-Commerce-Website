import React, { Component } from "react"
import Header from "./Header"
import Footer from "./Footer"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"

export default class PurchaseHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: "",
      secondName: "",
      email: "",
      purchaseDetails: []
    }
  }

  componentDidMount() {
    // Mainly for getting the users email, first name and second name
    axios.get(`${SERVER_HOST}/users/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          }
          else {
            console.log("Found user")

            this.setState({
              userID: res.data._id,
              firstName: res.data.firstName,
              secondName: res.data.secondName,
              email: res.data.email
            })
          }
        }
        else {
          console.log(`User not found`)
        }
      })

    // to find all the purchases made by the user currently logged in (by using localStorage.id)
    axios.get(`${SERVER_HOST}/sales/${this.props.match.params.id}`)
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          }
          else {
            console.log("Found purchase history")

            this.setState({
              purchaseDetails: res.data
            })
          }
        }
        else {
          console.log(`Purchase not found`)
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="purchase-history-container">
          <div className="purchase-history-scrollable-content">
            {this.state.purchaseDetails.map(order => (
              <div className="order-container">
                <div className="order-header">
                  <div className="left-content">
                    <div>
                      <p className="header">DATE ORDERED</p>
                      <p className="body">N/A</p>
                    </div>
                    <div>
                      <p className="header">TOTAL AMOUNT</p>
                      <p className="body">€{order.totalPrice}</p>
                    </div>
                    <div>
                      <p className="header">ORDER OWNER</p>
                      <p className="body">{this.state.firstName} {this.state.secondName}</p>
                    </div>
                  </div>
                  <p className="order-id"> ORDER # {order.paypalPaymentID}</p>
                </div>
                <div className="order-items-container">
                  {order.cartItems.map(item => (
                    <div className="order-items">
                      <img src={item.productImgs[0]} className="product-image" />
                      <div className="product-details">
                        <p>{item.name}</p>
                        <p>€{item.price}</p>
                        <p>x{item.quantity} bought</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}
