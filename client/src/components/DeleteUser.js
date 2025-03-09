import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { ACCESS_LEVEL_ADMIN } from "../config/global_constants";
import { SERVER_HOST } from "../config/global_constants";

export default class DeleteUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectToPage: localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
    }
  }

  componentDidMount() {
    // match.params.id is used to get the user id from the URL (user._id)
    axios.delete(`${SERVER_HOST}/users/${this.props.match.params.id}`, { headers: { "authorization": localStorage.token } })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("User deleted")
            this.setState({ redirectToPage: true })
          }
        } else {
          console.log("User not deleted")
        }
      }).catch((err) => {
        alert("Error in deleting user")
      })
  }

  render() {
    return <div>{this.state.redirectToPage ? <Redirect to="/users" /> : null}</div>
  }
}
