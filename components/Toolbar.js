import React, {Component} from "react"

import { Link } from "react-router-dom"

export default class Toolbar extends Component {
    render() {
        return (
            <div id="toolbar">
                <div id="toolbar-content">  
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
                        <Link id="user-profile" to={"/login"}>
                            <img src="/images/user.png"/>
                        </Link>
                    </div>
                </div>
            </div> 
        )
    }
}