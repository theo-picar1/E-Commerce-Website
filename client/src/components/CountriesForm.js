import React, {Component} from "react"

import DropDownRegionsList from "./DropDownRegionsList"
import CountriesTable from "./CountriesTable"

export default class CountriesForm extends Component 
{
    constructor(props)
    {
        super(props)
        
        this.state = {countries:[],
                      selectedCountries:[],
                      regions:[],
                      selectedRegion:"All Regions"}
    }
               
    componentDidMount()
    {
        fetch("json/countries.json")
        .then(response => response.json())
        .then(countries => 
        {
            // get the list of unique regions
            let regions = countries.map(country => country.region)
            let uniqueRegions = [...new Set(regions)].sort()
            uniqueRegions.unshift("All Regions") // add "All Regions" to the front of the array
            uniqueRegions[uniqueRegions.indexOf("")] = "None" // replace empty region (i.e. "") with "None"  
            
            this.setState({countries:countries, selectedCountries:countries, regions:uniqueRegions})
        })
    }


    handleRegionsChange = e => 
    {
        if(e.target.value === "All Regions") // all countries
        {
            this.setState({selectedRegion: e.target.value, selectedCountries: this.state.countries})
        }
        else if(e.target.value === "None") // Deal with the two regions Bouvet Island and Heard Island and McDonald Islands that have an empty country.region in the JSON file 
        {
            this.setState({selectedRegion: e.target.value, selectedCountries: this.state.countries.filter(country => country.region === "")})
        }
        else  // countries from one region
        {
            this.setState({selectedRegion: e.target.value, selectedCountries: this.state.countries.filter(country => country.region === e.target.value)})
        }
    }
                    
    
    render()
    {           
        return (  
          <div id="countriesDiv">
              <DropDownRegionsList regions={this.state.regions} handleRegionsChange={this.handleRegionsChange}/>
              <h1>{this.state.selectedRegion}</h1>              
              <CountriesTable countries={this.state.selectedCountries} region={this.state.selectedRegion}/>             
          </div>
        )
    }
}