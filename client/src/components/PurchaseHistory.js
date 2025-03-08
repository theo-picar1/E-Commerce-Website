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
    axios.get(`${SERVER_HOST}/users/${localStorage.id}`)
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
    axios.get(`${SERVER_HOST}/sales/${localStorage.id}`)
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
      <div className="purchase-history-container">
        <div className="purchase-history-scrollable-content">
          {this.state.purchaseDetails.map(order => (
            <div>
              <h1>ORDER ID: {order.paypalPaymentID}</h1>

              {order.cartItems.map(item => (
                <div className="order-items">
                    <p>{item.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}
