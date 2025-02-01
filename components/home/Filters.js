import React, {Component} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"

export default class Toolbar extends Component {
    render() {
        return (
            <div id="product-filters">
                <select id="select-product-filter">
                    { this.props.categories.map(category => 
                        <option value={ category }>{ category }</option>
                    )}
                </select>
            </div> 
        )
    }
}