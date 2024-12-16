import React, {Component} from "react"

import {Link} from "react-router-dom/cjs/react-router-dom.js" 

export default class Header extends Component {
    render() {
        return (
            <header id="header">
                <div id="header-content">
                    <div className="header-section">
                        <img src="/images/telephone.png" className="website-icon" alt="telephone" />
                        <p className="small-body">Round-the-clock free hotline (24/7)</p>
                    </div>
                    <div className="header-section">
                        <img src="/images/clock.png" className="website-icon" alt="clock" />
                        <p className="small-body">7 days a week from 9AM to 5PM</p>
                    </div>
                    <div className="header-section" id="nav-tabs">
                        <Link to="/" className="small-body page-link">Home</Link>
                        <Link to="/nosuchpage" className="small-body page-link">About Us</Link>
                        <Link to="/nosuchpage" className="small-body page-link">Contacts</Link>
                        <Link to="/nosuchpage" className="small-body page-link">Blog</Link>
                    </div>
                </div>
            </header>
        )
    }
}