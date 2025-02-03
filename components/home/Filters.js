import React, {Component} from "react"

export default class Filters extends Component {
    render() {
        return (
            <div id="product-filters">
                <p className="subheading">FILTERS</p>
                <div className="filter-section">
                    <p className="filter-type-subheading">PRICE RANGE</p>
                    <div className="section-content">
                        <input type="range" min="1" max="5000" value="50"/>
                    </div>
                </div>
                <div className="filter-section">
                    <p className="filter-type-subheading">RATING</p>
                    <div className="section-content">
                        <input type="text" placeholder="min"/>
                        <input type="text" placeholder="min"/>
                    </div>
                </div>
                <div className="filter-section">
                    <p className="filter-type-subheading">INSTRUMENT</p>
                    <div className="section-content" id="instrument-checkboxes">
                        { this.props.categories.map(category =>
                            <div>
                                <input type="checkbox"/>
                                <p>{category}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="filter-section">
                    <p className="filter-type-subheading">STOCK QUANTITY</p>
                    <div className="section-content">
                        <input type="text" placeholder="min"/>
                        <input type="text" placeholder="max"/>
                    </div>
                </div>
            </div> 
        )
    }
}