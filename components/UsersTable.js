import React, {Component} from "react"

import { Link } from "react-router-dom"

import axios from "axios"

import { SERVER_HOST } from "../config/global_constants"

export default class UsersTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            originalUsers: []
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/users`).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage);
                } 
                else {
                    console.log("Users have been successfully retrieved/read");
        
                    this.setState({
                        users: res.data,
                        originalUsers: res.data
                    })
                }
            }
        })
    }

    render() {
        return(
            <div>
                <table id="users-table">
                    <p>placeholdder</p>
                </table>
            </div>
        )
    }
}