import React, {Component} from "react"
import PropTypes from "prop-types"
import Modal from "./Modal"

export default class CountryRow extends Component 
{
    static propTypes = 
    {
        country:PropTypes.object,
        region:PropTypes.string
    }
    
    
    constructor(props)
    {
        super(props)
        
        this.state = {showModal: false}    
    }
    
    
    handleRowClick = e =>
    {    
        this.toggleModal()      
    }
 
 
    toggleModal() 
    {    
        this.setState({showModal: !this.state.showModal})
    }
    
    
    render()
    {           
        return (                 
                <tr onClick={this.handleRowClick} >
                  <td>
                    {this.state.showModal ? <Modal country = {this.props.country} closeModal = {this.toggleModal.bind(this)}/> : null}
		    {this.props.country.name}</td><td>{this.props.country.capital}</td>{(this.props.region==="All Regions")?(<td>{this.props.country.region}</td>):null}<td className="population">{this.props.country.population}</td>
                </tr>                                  
        )
    }
}