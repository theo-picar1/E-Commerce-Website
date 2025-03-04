import React, { Component } from "react"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN } from "../config/global_constants"

export default class Filters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            price: 150000,
            //minRating: ``,
            //maxRating: ``,
            checkedInstruments: [],
            //minStock: ``,
            //maxStock: ``
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckboxes = () => {
        let checkboxes = document.getElementsByClassName("instrument-checkbox")

        let selectedCheckboxes = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value)

        this.setState({ checkedInstruments: selectedCheckboxes })

        this.props.onFilterChange({
            checkedInstruments: selectedCheckboxes,
            price: this.state.price
        })
    }

    handlePriceChange = (e) => {
        const price = e.target.value
        this.setState({ price }, () => {
            this.props.onFilterChange({
                checkedInstruments: this.state.checkedInstruments,
                price: this.state.price,
            })
        })
    }


    render() {
        return (
            <div id="product-filters">
                <p className="subheading">FILTERS</p>
                {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <h1>Testing adminstration code</h1> : null}
                <div className="filter-section">
                    <p className="filter-type-subheading">PRICE RANGE</p>
                    <div className="section-content" id="price-range-section">
                        <input type="range" min="1" max="150000"
                            id="price-range-slider"
                            name="price"
                            value={this.state.price}
                            onChange={this.handlePriceChange} />
                    </div>
                </div>
                {/* <div className="filter-section">
                    <p className="filter-type-subheading">RATING</p>
                    <div className="section-content min-max-section">
                        <input type="text" id="min-rating" placeholder="min" name="minRating" value={this.state.minRating} onChange={this.handleChange}/>
                        <p>-</p>
                        <input type="text" id="max-rating" placeholder="max" name="maxRating" value={this.state.maxRating} onChange={this.handleChange}/>
                    </div>
                </div> */}
                <div className="filter-section">
                    <p className="filter-type-subheading">INSTRUMENT</p>
                    <div className="section-content" id="instrument-checkboxes">
                        {this.props.categories.map(category =>
                            <div key={category}>
                                <input type="checkbox" key={category} className="instrument-checkbox" value={category} onChange={this.handleCheckboxes} />
                                <p>{category}</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* <div className="filter-section">
                    <p className="filter-type-subheading">STOCK QUANTITY</p>
                    <div className="section-content min-max-section">
                        <input type="text" placeholder="min" name="minStock" value={this.state.minStock} onChange={this.handleChange}/>
                        <p>-</p>
                        <input type="text" placeholder="max" name="maxStock" value={this.state.maxStock} onChange={this.handleChange}/>
                    </div>
                </div> */}
            </div>
        )
    }
}