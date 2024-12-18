import React, {Component} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"

export default class Toolbar extends Component {
    render() {
        return (
            <div id="product-filters">
                <Link to="/nosuchpage" className="link" >GUITARS</Link>
                <Link to="/nosuchpage" className="link" >KEYBOARDS & PIANOS</Link>
                <Link to="/nosuchpage" className="link" >DRUMS & PERCUSSIONS</Link>
                <Link to="/nosuchpage" className="link" >AMPLIFIERS</Link>
            </div> 
        )
    }
}