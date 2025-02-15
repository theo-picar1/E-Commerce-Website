import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import { SERVER_HOST } from "../config/global_constants"


export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            isRegistered: false,
            submittedOnce: false,
            invalidEmail: false,
            invalidPassword: false,
            invalidConfirmPassword: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({
            invalidEmail: this.state.email !== "" && !this.validEmail(),
            invalidPassword: this.state.password !== "" && !this.validPassword(),
            invalidConfirmPassword: !this.validConfirmPassword(),
            submittedOnce: true
        })

        const formInputsState = this.validate()

        if (Object.keys(formInputsState).every(key => formInputsState[key])) {
            axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        }
                        else 
                        {
                            console.log("User registered")

                            this.setState({
                                isRegistered: true
                            })
                        }
                    }
                    else {
                        console.log("Registration failed")
                    }
                })
        }
        else {
            e.preventDefault()

            return
        }
    }

    validEmail() {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return pattern.test(String(this.state.email).toLowerCase())
    }


    validPassword() {
        const pattern = /^.{8,}$/

        return pattern.test(String(this.state.password))
    }

    validConfirmPassword() {
        return (this.state.password === this.state.confirmPassword)
    }

    validate() {
        return {
            email: this.validEmail(),
            password: this.validPassword(),
            confirmPassword: this.validConfirmPassword()
        }
    }


    render() {
        return (
            <div className="form-container">
                <form noValidate={true}>
                    <div id="website-title">
                        <div id="superments">
                            <p className="title" id="super">SUPER</p>
                            <p className="title">MENTS</p>
                        </div>
                        <div>
                            <img src="/images/website-logo.jpg" className="website-logo" />
                        </div>
                    </div>
                    {!this.state.isRegistered ? 
                    <div className="input-section">
                        <p className="title">REGISTER</p>
                        <div className="input-form-container">
                            <div>
                                <p className="input-header">Full name</p>
                                <input
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    style={this.state.submittedOnce && this.state.name === "" ? { border: "thin solid red" } : {}}
                                />
                                {this.state.submittedOnce && this.state.name === "" && (
                                    <p className="empty-input">Please fill out this form</p>
                                )}
                            </div>
                            <div>
                                <p className="input-header">Enter your email</p>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    style={this.state.submittedOnce && (this.state.email === "" || this.state.invalidEmail) ? { border: "thin solid red" } : {}}
                                />
                                {this.state.submittedOnce && this.state.email === "" && !this.state.invalidEmail && (
                                    <p className="empty-input">Please fill out this form</p>
                                )}
                                {this.state.submittedOnce && this.state.invalidEmail && (
                                    <p className="error-message">Please enter a valid email</p>
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
                                    style={this.state.submittedOnce && (this.state.password === "" || this.state.invalidPassword) ? { border: "thin solid red" } : {}}
                                    placeholder="8 characters minimum"
                                />
                                {this.state.submittedOnce && this.state.password === "" && !this.state.invalidPassword && (
                                    <p className="empty-input">Please fill out this form</p>
                                )}
                                {this.state.submittedOnce && this.state.invalidPassword && (
                                    <p className="error-message">Your password must be at least 8 characters long</p>
                                )}
                            </div>
                            <div>
                                <p className="input-header">Confirm your password</p>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    style={this.state.submittedOnce && (this.state.confirmPassword === "" || this.state.invalidConfirmPassword) ? { border: "thin solid red" } : {}}
                                />
                                {this.state.submittedOnce && this.state.invalidConfirmPassword && (
                                    <p className="error-message">Passwords do not match</p>
                                )}
                            </div>
                        </div>
                        <button onClick={this.handleSubmit}>REGISTER</button>
                        <p className="form-message">Already have an account? <Link className="link" to={"/login"}>Login</Link></p>
                        
                    </div> 
                    : 
                    <div className="successful-page">
                        <b>Successfully registered!</b>
                        <p>Please proceed to the login page</p>
                        <Link to={"/login"}><button>LOGIN</button></Link>
                    </div>}
                </form>
            </div>
        )
    }
}