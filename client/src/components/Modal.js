import React, {Component} from "react"
import PropTypes from "prop-types"


export default class Modal extends Component 
{
    static propTypes = 
    {
        country:PropTypes.object,     
        closeModal:PropTypes.func
    }
    
    
    render() 
    {
	let flag = `https://flagcdn.com/256x192/${(this.props.country.alpha2Code).toLowerCase()}.png`	
        return ( 
          <div id = "modal">
            <div id = "modalContent">
              <h1>{this.props.country.name}</h1>
              <img id = "flag" src={flag} alt="Country flag"/>
            
              <h2>Capital City</h2>
              <p>{this.props.country.capital}</p>
              <h2>Population</h2>
              <p>{this.props.country.population}</p>           

              <div id="exitButton" onClick={this.props.closeModal}><img src="images/exit.png" alt="Exit button"/></div>
            </div>
          </div>
        )
    }
}