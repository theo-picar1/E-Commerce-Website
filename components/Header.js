import React, {Component} from "react"

export default class Header extends Component {
    render() {
        return (
            <header id="header">  
                <div id="header-content">
                    <div class="header-section">
                        <img src="/images/telephone.png" className="website-icon"/>
                        <p className="small-body">Round-the-clock free hotline (24/7)</p>
                    </div>
                    <div class="header-section">
                        <img src="/images/clock.png" className="website-icon"/>
                        <p className="small-body">7 days a week from 9AM to 5PM</p>
                    </div>
                    <div class="header-section" id="nav-tabs">
                        <p className="small-body">Home</p>
                        <p className="small-body">About Us</p>
                        <p className="small-body">Contacts</p>
                        <p className="small-body">Blog</p>
                    </div>
                </div>
            </header>         
        )
    }
}