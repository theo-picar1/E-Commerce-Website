import React, {Component} from "react"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import CountriesForm from "./components/CountriesForm"
    
export default class App extends Component 
{
    render() 
    {
        return (
            <div>  
                <CountriesForm/>
            </div>         
        )
    }
}