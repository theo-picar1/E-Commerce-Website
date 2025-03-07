import React, { Component } from "react"
import Header from "./Header"
import Footer from "./Footer"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"

export default class PurchaseHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [],
    }
  }

  // SUBJECT TO CHANGE SO NO POINT IN COMMENTS

  componentDidMount() {
    this.getPurchaseHistory()
  }

  getPurchaseHistory = () => {
    let userId = localStorage.id
    console.log(userId)
    axios.get(`${SERVER_HOST}/users/${userId}/purchaseHistory`)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("Purchase History has been successfully retrieved/read")
            this.setState({
              history: res.data,
            })
          }
        }
      })
  }

  addToPurchaseHistory = () => {
    const history = {
      orderId: "#" + (12345 + this.state.history.length),
      date: "2025-03-05",
      items: [
        {
          name: "Single Cutaway Acoustic Guitar by Gear4music, Sunburst",
          quantity: 1,
          price: 72.99,
        },
        {
          name: "Jupiter JCL-700S-Q Bb Clarinet",
          quantity: 2,
          price: 563.99,
        },
      ],
      totalAmount: 0,
    }

    const totalAmount = history.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    history.totalAmount = totalAmount

    axios.post(`${SERVER_HOST}/users/id/addToPurchaseHistory`, {
        userId: localStorage.id,
        history,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            alert(res.data.errorMessage)
          } else {
            this.getPurchaseHistory()
            console.log("History added to Purchase History successfully")
          }
        }
      })
      .catch((err) => {
        console.error("Error:", err)
      })
  }

  printHistory = () => {
    console.log(this.state.history)
  }

  render() {
    return (
      <div className="page-content">
        <button onClick={() => this.addToPurchaseHistory()}>Add History</button>
        <Header />
        <div className="purchase-history">
          <h2>Purchase History</h2>
          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.state.history.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.date}</td>
                    <td>
                      <div className="order-row">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <div>{item.name}</div>
                            <div>${item.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="order-row">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <div>{item.quantity}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="total-amount">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
