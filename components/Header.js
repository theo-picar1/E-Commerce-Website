import React, {Component} from "react"

export default class Header extends Component {
    render() {
        return (
            <header id="header">  
                <div id="header-content">
                    <div class="header-section">
                        <img src="/images/telephone.png" className="website-icon"/>
                        <p>Round-the-clock free hotline (24/7)</p>
                    </div>
                    <div class="header-section">
                        <img src="/images/clock.png" className="website-icon"/>
                        <p>7 days a week from 9AM to 5PM</p>
                    </div>
                    <div class="header-section" id="nav-tabs">
                        <p>Home</p>
                        <p>About Us</p>
                        <p>Contacts</p>
                        <p>Blog</p>
                    </div>
                </div>
            </header>         
        )
    }
}