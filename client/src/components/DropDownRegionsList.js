import React, {Component} from "react"
import PropTypes from "prop-types"


export default class DropDownRegionsList extends Component
{
    static propTypes = 
    {
        regions:PropTypes.array,
        handleRegionsChange:PropTypes.func
    }
    
    
    render()
    {           
        return (
            <select name="regions" onChange={this.props.handleRegionsChange}>                         
              {this.props.regions.map(region => <option key={region} value={region}>{region}</option>)}      
            </select>   
        )
    }
}