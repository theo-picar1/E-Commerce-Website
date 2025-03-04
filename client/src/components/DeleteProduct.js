import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

import { SERVER_HOST } from "../config/global_constants"

export default class DeleteProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectToPage: false,
    }
  }

  componentDidMount() {
    axios
      .delete(`${SERVER_HOST}/products/${this.props.match.params.id}`)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } // success
          else {
            console.log("Record deleted")
          }
          this.setState({ redirectToPage: true })
        } else {
          console.log("Record not deleted")
        }
      }).catch((err) => {
        console.log("Error deleting record:" + err)
      })
  }

  render() {
    return <div>{this.state.redirectToPage ? <Redirect to="/" /> : null}</div>
  }
}
