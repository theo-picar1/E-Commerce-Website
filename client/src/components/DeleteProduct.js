import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

import { ACCESS_LEVEL_ADMIN } from "../config/global_constants"

import { SERVER_HOST } from "../config/global_constants"

// Refer back to AddProduct.js! DeleteProduct.js and EditProduct.js have code that is explained in AddProduct
export default class DeleteProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectToPage: localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
    }
  }

  componentDidMount() {
    // match.params.id is used to get the id from the passed in URL (product._id). It's sent through a <Link>
    axios.delete(`${SERVER_HOST}/products/${this.props.match.params.id}`, { headers: { "authorization": localStorage.token } })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          }
          else {
            console.log("Record deleted")
            this.setState({ redirectToPage: true })
          }
        } else {
          console.log("Record not deleted")
        }
      })
  }

  render() {
    return <div>{this.state.redirectToPage ? <Redirect to="/" /> : null}</div>
  }
}
