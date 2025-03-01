import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../config/global_constants"


export default class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: true
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/users/logout`).then(res => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                }
                else {
                    console.log("User logged out")
                    sessionStorage.clear()

                    sessionStorage.name = "GUEST"
                    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
                    this.setState({ isLoggedIn: false })
                }
            }
            else {
                console.log("Logout failed")
            }
        })
    }


    render() {
        return (
            <div id="logout-page">
                <div id="content">
                    {!this.state.isLoggedIn ? <Redirect to="/" /> : null}
                    <div id="website-title">
                        <div id="superments">
                            <p className="title" id="super">SUPER</p>
                            <p className="title">MENTS</p>
                        </div>
                        <div>
                            <img src="/images/website-logo.jpg" className="website-logo" />
                        </div>
                    </div>
                    <h1>Successfully logged out!</h1>
                    <p>You can head back to the main page</p>
                    <button id="return-button" onClick={this.handleSubmit}>Return</button>
                </div>
            </div>
        )
    }
}