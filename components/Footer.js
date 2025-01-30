import React, {Component} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer"> 
                <div id="main-content">
                    <div id="about">
                        <p className="content-title">ABOUT</p>
                        <p className="text" id="about-text">Our store is more than just another average online retailer. We sell not only top quality products, but give our customers a positive online shopping experience. We work to make your life more enjoyable.</p>
                    </div>
                    <div id="information">
                        <p className="content-title">INFORMATION</p>
                        <Link className="link" to="/nosuchpage">About Us</Link>
                        <Link className="link" to="/nosuchpage">Customer Service</Link>
                        <Link className="link" to="/nosuchpage">Privacy Policy</Link>
                        <Link className="link" to="/nosuchpage">Contact Us</Link>
                        <Link className="link" to="/nosuchpage">FAQ</Link>
                        <Link className="link" to="/nosuchpage">Blog</Link>
                    </div>
                    <div>
                        <p className="content-title">WHY BUY FROM US</p>
                        <Link className="link" to="/nosuchpage">Shipping & Delivery</Link>
                        <Link className="link" to="/nosuchpage">Secure Payment</Link>
                        <Link className="link" to="/nosuchpage">Guarantee</Link>
                        <Link className="link" to="/nosuchpage">Terms & Conditions</Link>
                    </div>
                </div>
                <div id="copyright-notice">
                    <p>&#169; THEO DAMI OISIN | ALL RIGHTS RESERVED</p>
                </div>
            </footer>         
        )
    }
}