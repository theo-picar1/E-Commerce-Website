import React, {Component} from "react"

import { Link } from "react-router-dom"

import { ACCESS_LEVEL_GUEST } from "../config/global_constants"

export default class Header extends Component {
    render() {
        return (
            <div id="header">
                <div id="header-content">  
                    <div id="website-title">
                        <div id="superments">
                            <p className="title" id="super">SUPER</p>
                            <p className="title">MENTS</p>
                        </div>
                        <div>
                            <img src="/images/website-logo.jpg" className="website-logo"/>
                        </div>
                    </div>
                    <div id="searchbar-container">
                        <input type="text" id="searchbar" placeholder="What are you searching for?" autoComplete="off"/>
                        <img src="/images/search.png" className="website-icon"/>
                    </div>
                    <div id="user-tools">
                        <div id="shopping-cart-button">
                            <img src="/images/shopping-cart.png"/>
                            <p>{ this.props.cartCounter }</p>
                        </div>
                        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? 
                            <div id="user-status-container">
                                <Link to={"/logout"}>Log out</Link>
                                <p>Name here</p>
                                <div>
                                    <div id="user-options-button" onclick="showModal('user-options', 'close-user-options')">
                                        <img src="/images/menu-black.png" className="website-icon"/>
                                        <img src="/images/user.png" id="user-role-image" className="website-icon"/>
                                    </div>
                                    <div id="user-options">
                                        <p class="page-icon" id="close-user-options">&times;</p>
                                        <p class="small-body-text option" onclick="displayLoginPage()">Sign out</p>
                                        <hr />
                                        <p class="small-body-text option not-available">Help Center</p>
                                        <p class="small-body-text option not-available">FAQs</p>
                                    </div>
                                </div>
                            </div> 
                        :
                            <Link to={"/login"}>Sign in</Link>
                        }
                        <div id="user-table-button">
                            <Link>Users</Link>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}