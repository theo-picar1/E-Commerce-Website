import React, { Component } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.js"

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
        }
    }

    toggleModal = () => {
        this.setState({
            openModal: true
        })
    }

    // Code by ChatGPT
    // *********************************************************************************
    handleClickOutside = (event) => {
        const modal = document.getElementById("mobile-nav-tabs")
        const button = document.getElementById("nav-tabs-button")

        if (modal && !modal.contains(event.target) && !button.contains(event.target)) {
            this.setState({ openModal: false })
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside)
    }
    // *********************************************************************************

    render() {
        return (
            <header id="header">
                <div id="header-content">
                    <div className="header-section" id="start-section">
                        <img src="/images/telephone.png" className="website-icon"/>
                        <p className="small-body">Round-the-clock free hotline</p>
                    </div>
                    <div className="header-section">
                        <img src="/images/clock.png" className="website-icon"  />
                        <p className="small-body">7 days a week from 9AM to 5PM</p>
                    </div>
                    <div className="header-section" id="nav-tabs">
                        <Link to="/" className="small-body page-link">Home</Link>
                        <Link to="/nosuchpage" className="small-body page-link">About Us</Link>
                        <Link to="/nosuchpage" className="small-body page-link">Contacts</Link>
                        <Link to="/nosuchpage" className="small-body page-link">Blog</Link>
                    </div>
                    <div className="header-section" id="mobile-nav-tabs-container">
                        <div id="nav-tabs-button" onClick={this.toggleModal}>
                            <img src={this.state.openModal ? "/images/menu-red.png" : "/images/menu-black.png"}/>
                        </div>
                        <div
                            id="mobile-nav-tabs"
                            style={{
                                display: this.state.openModal ? "flex" : "none"
                            }}
                        >
                            <Link to="/" className="small-body page-link">Home</Link>
                            <Link to="/nosuchpage" className="small-body page-link">About Us</Link>
                            <Link to="/nosuchpage" className="small-body page-link">Contacts</Link>
                            <Link to="/nosuchpage" className="small-body page-link">Blog</Link>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
