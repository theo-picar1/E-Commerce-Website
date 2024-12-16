import React, {Component} from "react"

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer">  
                <div id="newsletter-section">
                    <div id="left-section">
                        <p className="subheading">Newsletter</p>
                        <p className="small-body">Get the latest news on new arrivals, gifts, special offers and other discount information.</p>
                    </div>
                    <div id="right-section">
                        <input type="text" placeholder="Enter your email address *"/>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
                <div id="main-content">
                    <div id="about">
                        <p className="content-title">ABOUT</p>
                        <p className="text" id="about-text">Our store is more than just another average online retailer. We sell not only top quality products, but give our customers a positive online shopping experience. We work to make your life more enjoyable.</p>
                    </div>
                    <div>
                        <p className="content-title">INFORMATION</p>
                        <p>About Us</p>
                        <p>Customer Service</p>
                        <p>Privacy Policy</p>
                        <p>Contact Us</p>
                        <p>FAQ</p>
                        <p>Blog</p>
                    </div>
                    <div>
                        <p className="content-title">WHY BUY FROM US</p>
                        <p>Shipping & Delivery</p>
                        <p>Secure Payment</p>
                        <p>Guarantee</p>
                        <p>Terms & Conditions</p>
                    </div>
                </div>
            </footer>         
        )
    }
}