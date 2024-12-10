import React, {Component} from "react"
import PropTypes from "prop-types"
import {ASCENDING} from "../config/global_constants.js"
import CountryRow from "./CountryRow"

export default class CountriesTable extends Component 
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            sortDirection:ASCENDING,
            sortColumn:"name"
        }    
    }
	

    static propTypes = 
    {
        countries:PropTypes.array,
        region:PropTypes.string
    }

    
    componentDidMount()
    {
        this.props.countries.sort((a, b) => a["name"] < b["name"]?-1:1) 
        this.setState({sortColumn:"name"})
    }
    
    
    static getDerivedStateFromProps(props, state) 
    { 
        if(state.countries !== props.countries) // the region has been changed
        {
            // reset the sort to be ascending on name
            const sortColumn = "name"
            let sortDirection = state.sortDirection
            if(state.sortColumn === sortColumn)
            {
                sortDirection = -sortDirection 
            }
            else
            {
                sortDirection = 1
            }

            props.countries.sort((a, b) => a[sortColumn] < b[sortColumn]?-sortDirection:sortDirection)
        }
        
        return(state.countries !== props.countries?{countries: props.countries, sortDirection:1, sortColumn:"name"}:null) 
    } 
	
    
    handleHeaderClick = e =>
    {      
        const sortColumn = e.target.id
        let sortDirection = this.state.sortDirection
        if(this.state.sortColumn === sortColumn)
        {
            sortDirection = -sortDirection 
        }
        else
        {
            sortDirection = ASCENDING
        }

        this.props.countries.sort((a, b) => a[sortColumn] < b[sortColumn]?-sortDirection:sortDirection)
        this.setState({sortDirection:sortDirection, sortColumn:sortColumn}) 
    }
    
    
    render()
    {           
        return ( 
                <div>
                  <table id="countriesTable"> 
                    <thead>
                      <tr><th id="name" onClick={this.handleHeaderClick}>Name {(this.state.sortColumn === "name" && this.state.sortDirection === ASCENDING) ? "▲" : null} {(this.state.sortColumn === "name" && this.state.sortDirection === -ASCENDING) ? "▼" : null}</th><th id="capital" onClick={this.handleHeaderClick}>Capital {(this.state.sortColumn === "capital" && this.state.sortDirection === ASCENDING) ? "▲" : null} {(this.state.sortColumn === "capital" && this.state.sortDirection === -ASCENDING) ? "▼" : null}</th>{(this.props.region === "All Regions")?(<th id="region" onClick={this.handleHeaderClick}>Region {(this.state.sortColumn === "region" && this.state.sortDirection === ASCENDING) ? "▲" : null} {(this.state.sortColumn === "region" && this.state.sortDirection === -ASCENDING) ? "▼" : null}</th>):null}<th id="population" onClick={this.handleHeaderClick} className="population">Population {(this.state.sortColumn === "population" && this.state.sortDirection === ASCENDING) ? "▲" : null} {(this.state.sortColumn === "population" && this.state.sortDirection === -ASCENDING) ? "▼" : null}</th></tr>
                    </thead> 
                    <tbody>
                      {this.state.countries.map(country => <CountryRow key={country.alpha2Code} country={country} region={this.props.region}/>)}   
                    </tbody>                   
                  </table> 
                </div>               
        )
    }
}