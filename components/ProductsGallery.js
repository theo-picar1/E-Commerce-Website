import React, {Component} from 'react'

export default class ProductsGallery extends Component {
    render() {
        return (
            <div id="products-gallery">
                <div id="top-section">
                    <div id="image-slideshow">
                        <div className="image-container">
                            <div className="image-content-container">
                                <div className="image-content-left">
                                    <h1>ACOUSTIC GUITARS</h1>
                                    <p>OVER 100+ GUITARS FOR SALE</p>
                                    <button className="shop-now-button-red">SHOP NOW!</button>
                                </div>
                            </div>
                            <img src="/images/guitar-background.jpg"/>
                        </div>
                        <div className="image-container">
                            <div className="image-content-container">
                                <div className="image-content-right">
                                    <h1>PREMIUM KEYBOARDS</h1>
                                    <p>HIGH QUALITY KEYBOARDS FOR SALE</p>
                                    <button className="shop-now-button-red">SHOP NOW!</button>
                                </div>
                            </div>
                            <img src="/images/keyboard-background.webp"/>
                        </div>
                        <div className="image-container">
                            <div className="image-content-container">
                                <div className="image-content-right">
                                    <h1>STURDY DRUMS</h1>
                                    <p>ORDER NOW & GET 20% OFF</p>
                                    <button className="shop-now-button-red">SHOP NOW!</button>
                                </div>
                            </div>
                            <img src="/images/drums-background.jpg"/>
                        </div>
                        <div className="image-container">
                            <div className="image-content-container">
                                <div className="image-content-left">
                                    <h1>POWERFUL AMPLIFIERS</h1>
                                    <p>PERFECT FOR ANYTHING</p>
                                    <button className="shop-now-button-red">SHOP NOW!</button>
                                </div>
                            </div>                            
                            <img src="/images/amplifier-background.jpg"/>
                        </div>
                    </div>
                    <div id="sale-banner">
                        <h1 id="sale-offer">BLACK FRIDAY IN DECEMBER 2025!</h1>
                        <h1>GET UP TO 60% OFF ORDERS</h1>
                    </div>
                </div>
                <div id="bottom-section">
                    <div className="product-navigation-tab" style={{backgroundImage: `url(/images/guitar-background-2.jpeg)`}}>
                        <div>
                            <h1>GUITARS</h1>
                        </div>
                    </div>
                    <div className="product-navigation-tab" style={{backgroundImage: `url(/images/keyboard-background-2.jpg)`}}>
                        <div>
                            <h1>KEYBOARDS</h1>
                        </div>
                    </div>
                    <div className="product-navigation-tab" style={{backgroundImage: `url(/images/drum-background-2.avif)`}}>
                            <div>
                            <h1>DRUMS</h1>
                        </div>
                    </div>
                    <div className="product-navigation-tab" style={{backgroundImage: `url(/images/amplifier-background-2.jpeg)`}}>
                        <div>
                            <h1>AMPLIFIERS</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}