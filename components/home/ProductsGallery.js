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
                                <button className="shop-now-button">SHOP NOW!</button>
                            </div>
                        </div>
                        <div className="image-container" style={{backgroundImage: `url(/images/keyboard-background.webp)`}}>
                            <div className="image-content">
                                <p className="image-title">PREMIUM KEYBOARDS</p>
                                <p>HIGH QUALITY KEYBOARDS</p>
                                <button className="shop-now-button">SHOP NOW!</button>
                            </div>
                        </div>
                        <div className="image-container" style={{backgroundImage: `url(/images/drums-background.jpg)`}}>   
                            <div className="image-content">
                                <p className="image-title">STURDY DRUMS</p>
                                <p>ORDER NOW & GET 20% OFF</p>
                                <button className="shop-now-button">SHOP NOW!</button>        
                            </div>                                   
                        </div>
                        <div className="image-container" style={{backgroundImage: `url(/images/amplifier-background.jpg)`}}>  
                            <div className="image-content">
                                <p className="image-title">POWERFUL AMPLIFIERS</p>
                                <p>PERFECT FOR ANYTHING</p>
                                <button className="shop-now-button">SHOP NOW!</button> 
                            </div>                                                    
                        </div>
                    </div>
                    <div id="sale-banner">
                        <p id="sale-offer">BLACK FRIDAY IN DECEMBER 2025!</p>
                        <p>60% OFF ORDERS</p>
                    </div>
                </div>
            </div>
        )
    }
}