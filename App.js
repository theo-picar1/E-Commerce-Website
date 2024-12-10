import React, {Component} from "react"

import "./css/App.css"

import ECommerceForm from "./components/CountriesForm"
    
export default class App extends Component 
{
    render() 
    {
        return (
            <div>  
                <ECommerceForm />
            </div>         
        )
    }
}