import React, {Component} from "react"

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
                    <div id="tools-container">
                        <div id="searchbar-container">
                            <input type="text" id="searchbar" placeholder="Search for instruments..."/>
                            <img src="/images/search.png" className="website-icon"/>
                        </div>
                        <div id="user-tools">
                            <img src="/images/shopping-cart.png" className="website-icon"/>
                            <img src="/images/user.png" className="website-icon"/>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}