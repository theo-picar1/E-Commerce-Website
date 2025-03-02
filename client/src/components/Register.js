import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import { SERVER_HOST } from "../config/global_constants"


export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            secondName: "",
            email: "",
            houseAddress: "",
            telephoneNo: "",
            password: "",
            confirmPassword: "",
            isRegistered: false,
            submittedOnce: false,
            invalidEmail: false,
            invalidPassword: false,
            invalidConfirmPassword: false,
            invalidTelephone: false
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
            invalidTelephoneNo: this.state.telephoneNo !== "" && !this.validTelephoneNo,
            submittedOnce: true
        })

        const formInputsState = this.validate()
        const userObject = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            email: this.state.email,
            houseAddress: this.state.houseAddress,
            telephoneNo: this.state.telephoneNo,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        if (Object.keys(formInputsState).every(key => formInputsState[key])) {
            axios.post(`${SERVER_HOST}/users/register`, userObject)
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

    validTelephoneNo() {
        // Reference: https://stackoverflow.com/questions/2957412/need-a-regular-expression-for-an-irish-phone-number
        const pattern = /|^\s*\(?\s*\d{1,4}\s*\)?\s*[\d\s]{5,10}\s*$|/

        return pattern.test(String(this.state.password))
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
            telephoneNo: this.validTelephoneNo(),
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
                            <div className="input-row-container">
                                <div>
                                    <p className="input-header">First name</p>
                                    <input
                                        name="firstName"
                                        type="text"
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && this.state.firstName === "" ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.firstName === "" && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                                <div>
                                    <p className="input-header">Second name</p>
                                    <input
                                        name="secondName"
                                        type="text"
                                        value={this.state.secondName}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && this.state.secondName === "" ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.secondName === "" && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
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
                            <div className="input-row-container">
                                <div>
                                    <p className="input-header">Telephone no.</p>
                                    <input
                                        name="telephoneNo"
                                        type="text"
                                        placeholder="Irish numbers only"
                                        value={this.state.telephoneNo}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && this.state.telephoneNo === "" ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.telephoneNo === "" && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
                                <div>
                                    <p className="input-header">Address</p>
                                    <input
                                        name="houseAddress"
                                        type="text"
                                        value={this.state.houseAddress}
                                        onChange={this.handleChange}
                                        style={this.state.submittedOnce && this.state.houseAddress === "" ? { border: "thin solid red" } : {}}
                                    />
                                    {this.state.submittedOnce && this.state.houseAddress === "" && (
                                        <p className="empty-input">Please fill out this form</p>
                                    )}
                                </div>
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