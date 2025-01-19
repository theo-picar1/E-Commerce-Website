import React, {Component} from 'react'

export default class FeaturedProducts extends Component {
    render() {
        return (
            <div id="featured-products-container">
                <p className="subheading">FEATURED PRODUCTS</p>
                <div id="featured-products-gallery">
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/sdp1-keyboard.webp)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">SDP-1 Portable Digital Keyboard Piano by Gear4music + Stand and Headphones</p>
                            <p className="product-price">€197.25</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/guitar-amplifier.webp)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">3rd Avenue 10W Guitar Amplifier with Headphone Output, Overdrive Switch, Tone Control–Portable Compact Practice Amp–Black</p>
                            <p className="product-price">€42.18</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/donner-amplifier.webp)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">Donner Bluetooth 5.0 Stereo Audio Amplifier Receiver, Peak power 440 W Hi-Fi Wireless 4 channel Desktop Amp with USB, SD,FM, 2 Mic IN Echo, RCA, LED, Speaker Selector for Studio, Home Speakers-MAMP5</p>
                            <p className="product-price">€130.38</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/junior5-drums.webp)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">Junior 5 Piece Drum Kit by Gear4music, Blue</p>
                            <p className="product-price">€209.50</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/gibson-guitar.jpg)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">Gibson Les Paul Standard '50s Tribute</p>
                            <p className="product-price">€2290.00</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/bdk1-plus-drums.webp)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">BDK-1plus Full Size Starter Drum Kit by Gear4music, Blue</p>
                            <p className="product-price">€370.00</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/k1-keyboard.webp)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">K1 61-Note Keyboard by Gear4music</p>
                            <p className="product-price">€61.60</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                    <div className="featured-product">
                        <div className="product-image" style={{backgroundImage: `url(/images/grv-rock-drums.jpeg)`}}>
                            <div><p>&#77946;</p></div>
                        </div>
                        <div className="product-details">
                            <p className="product-name">GRV Square Rock Drum Set (BK) + Cymbals Set B20</p>
                            <p className="product-price">€684.55</p>
                            <button className="shop-now-button">
                                <img src="/images/shopping-cart.png"/>
                                <p>ADD TO CART</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}