import React, {Component} from "react"

import Toolbar from "../components/home/Toolbar.js"
import Filters from "../components/home/Filters.js"
import Content from "../components/home/Content.js"

export default class Home extends Component {
    render() {
        return (
            <div className="page-content">
                <Toolbar />
                <Filters />
                <Content />
            </div>
        )
    }
}