import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"

import axios from "axios"

import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../config/global_constants"

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            isLoggedIn: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`).then(res => {
            sessionStorage.name = "GUEST"
            sessionStorage.accessLevel = ACCESS_LEVEL_GUEST

            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                }
                else {
                    console.log("User logged in")

                    sessionStorage.name = res.data.name
                    sessionStorage.accessLevel = res.data.accessLevel

                    this.setState({
                        isLoggedIn: true
                    })
                }
            }
            else {
                console.log("Login failed")
            }
        })
    }

    render() {
        return (
            <div className="form-container">
                <form noValidate={true}>
                    {this.state.isLoggedIn ? <Redirect to="/" /> : null}
                    <p className="title">LOGIN</p>
                    <div className="input-form-container">
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="password"
                            title="Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleSubmit}>LOGIN</button>
                    <p className="form-message">Don't have an account? <Link className="link" to={"/register"}> Register</Link></p>
                </form>
            </div>
        )
    }
}