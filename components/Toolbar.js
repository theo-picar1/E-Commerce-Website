import React, {Component} from "react"

export default class Toolbar extends Component {
    render() {
        return (
            <div id="toolbar">
                <div id="left-content">
                    <div id="website-title">
                        <h1 id="sound-h1">SOUND</h1>
                        <h1 id="bizzare-h1">BIZZARE</h1>
                        <img src="/images/website-logo.jpg" className="website-logo"/>
                    </div>
                    <div id="searchbar-container">
                        <input type="text" id="searchbar" placeholder="Search for instruments..."/>
                        <img src="/images/search.png" className="website-icon"/>
                    </div>
                </div>
                <div id="right-content">
                    <div>
                        <img src="/images/shopping-cart.png" className="website-icon"/>
                        <img src="/images/user.png" className="website-icon"/>
                    </div>
                </div>
            </div> 
        )
    }
}