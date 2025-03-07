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

    axios.get(`${SERVER_HOST}/sales/${localStorage.id}`)
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          }
          else {
            console.log("Found purchase history")

            this.setState({
              purchaseDetails: res.data.cartItems
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
      // <div className="page-content">
      //   <div className="purchase-history">
      //     <h2>Purchase History</h2>
      //     <div className="table-container">
      //       <table className="history-table">
      //         <thead>
      //           <tr>
      //             <th>Order ID</th>
      //             <th>Items</th>
      //             <th>Quantity</th>
      //             <th>Total Amount</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {this.state.purchaseDetails.map((order) =>
      //             <tr key={order._id}>
      //               <td>{order._id}</td>
      //               <td>
      //                 <div className="order-row">
      //                   {order.cartItems.map((item, index) =>
      //                     <div key={index} className="order-item">
      //                       <div>{item.name}</div>
      //                       <div>${item.price.toFixed(2)}</div>
      //                     </div>
      //                   )}
      //                 </div>
      //               </td>
      //               <td>
      //                 <div className="order-row">
      //                   {order.cartItems.map((item, index) =>
      //                     <div key={index} className="order-item">
      //                       <div>{item.quantity}</div>
      //                     </div>
      //                   )}
      //                 </div>
      //               </td>
      //               <td className="total-amount">$100</td>
      //             </tr>
      //           )}
      //         </tbody>
      //       </table>
      //     </div>
      //   </div>
      // </div>
      <div>
        {this.state.purchaseDetails.map((index, order) => (
          console.log("Order no ", index)
        ))}
      </div>
    )
  }
}
