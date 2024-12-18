import React, {Component} from 'react'

export default class ProductsGallery extends Component {
    render() {
        return (
            <div id="products-gallery">
                <div id="ads-section">
                    <div id="image-slideshow">
                        <div className="image-container" style={{backgroundImage: `url(/images/guitar-background.jpg)`}}>                    
                            <div className="image-content">
                                <p className="image-title">ACOUSTIC GUITARS</p>
                                <p>OVER 100+ GUITARS FOR SALE</p>
                                <button className="shop-now-button-red">SHOP NOW!</button>
                            </div>
                        </div>
                        <div className="image-container" style={{backgroundImage: `url(/images/keyboard-background.webp)`}}>
                            <div className="image-content">
                                <p className="image-title">PREMIUM KEYBOARDS</p>
                                <p>HIGH QUALITY KEYBOARDS</p>
                                <button className="shop-now-button-red">SHOP NOW!</button>
                            </div>
                        </div>
                        <div className="image-container" style={{backgroundImage: `url(/images/drums-background.jpg)`}}>   
                            <div className="image-content">
                                <p className="image-title">STURDY DRUMS</p>
                                <p>ORDER NOW & GET 20% OFF</p>
                                <button className="shop-now-button-red">SHOP NOW!</button>        
                            </div>                                   
                        </div>
                        <div className="image-container" style={{backgroundImage: `url(/images/amplifier-background.jpg)`}}>  
                            <div className="image-content">
                                <p className="image-title">POWERFUL AMPLIFIERS</p>
                                <p>PERFECT FOR ANYTHING</p>
                                <button className="shop-now-button-red">SHOP NOW!</button> 
                            </div>                                                    
                        </div>
                    </div>
                    <div id="sale-banner">
                        <h1 id="sale-offer">BLACK FRIDAY IN DECEMBER 2025!</h1>
                        <h1>60% OFF ORDERS</h1>
                    </div>
                </div>
                <div id="product-types-section">
                    <div className="product-navigation-tab" style={{backgroundImage: `url(/images/guitar-background-2.jpg)`}}>
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
                    <div className="product-navigation-tab" style={{backgroundImage: `url(/images/amplifier-background-2.jpg)`}}>
                        <div>
                            <h1>AMPLIFIERS</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}