import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../config/global_constants"

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      submittedOnce: false,
      name: "",
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      submittedOnce: true,
    })

    if (this.state.email !== "" && this.state.password !== "") {
      // Method to login user to DB with passed in email and password
      axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
        .then((res) => {
          console.log(res.data)

          if (res.data) {
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage)
            } 
            else {
              console.log("User logged in")

              localStorage.accessLevel = res.data.accessLevel
              localStorage.id = res.data._id
              localStorage.token = res.data.token
              
              // Remove the temporary guest object when login is successful
              localStorage.removeItem("user")

              this.setState({
                isLoggedIn: true,
                name: res.data.accessFirstName
              })
            }
          } else {
            console.log("Login failed")
            return
          }
        })
    }
  }

  render() {
    return (
      <div className="form-container">
        <form noValidate={true}>
          <div id="website-title">
            <div id="superments">
              <p className="title" id="super">
                SUPER
              </p>
              <p className="title">MENTS</p>
            </div>
            <div>
              <img src="/images/website-logo.jpg" className="website-logo" />
            </div>
          </div>
          {!this.state.isLoggedIn ? (
            <div className="input-section">
              <p className="title">LOGIN</p>
              <div className="input-form-container">
                <div>
                  <p className="input-header">Enter your email</p>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    style={
                      this.state.submittedOnce && this.state.email === ""
                        ? { border: "thin solid red" }
                        : {}
                    }
                  />
                  {this.state.submittedOnce && this.state.email === "" && (
                    <p className="empty-input">Please fill out this form</p>
                  )}
                </div>
                <div>
                  <p className="input-header">Enter your password</p>
                  <input
                    name="password"
                    type="password"
                    autoComplete="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    style={
                      this.state.submittedOnce && this.state.password === ""
                        ? { border: "thin solid red" }
                        : {}
                    }
                  />
                  {this.state.submittedOnce && this.state.password === "" && (
                    <p className="empty-input">Please fill out this form</p>
                  )}
                  {this.state.submittedOnce &&
                    this.state.email !== "" &&
                    this.state.password !== "" && (
                      <p className="error-message">
                        Incorrect email or password
                      </p>
                    )}
                </div>
              </div>
              <button onClick={this.handleSubmit}>LOGIN</button>
              <p className="form-message">
                Don't have an account?{" "}
                <Link className="link" to={"/register"}>
                  {" "}
                  Register
                </Link>
              </p>
            </div>
          ) : (
            <div className="successful-page">
              <p>Welcome back, {this.state.name}!</p>
              <Link className="link" to={"/"}>
                Back to SuperMents
              </Link>
            </div>
          )}
        </form>
      </div>
    )
  }
}
