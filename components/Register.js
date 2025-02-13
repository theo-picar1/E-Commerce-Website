import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            name: "",
            email:"",
            password:"",
            confirmPassword:"",    
            isRegistered:false
        } 
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully registered
                { 
                    console.log("User registered")                    
                    
                    this.setState({isRegistered:true})
                }        
            }
            else
            {
                console.log("Registration failed")
            }
        })   
    }


    render() {     
        return (
            <div className="form-container">
                <form noValidate = {true}>
                    {this.state.isRegistered ? <Redirect to="/login"/> : null} 
                    <p className="title">REGISTER</p>       
                    <div className="input-form-container">
                        <input  
                            name = "name"              
                            type = "text"
                            placeholder = "Enter your first and last name"
                            value = {this.state.name}
                            onChange = {this.handleChange}
                        />
                        <input  
                            name = "email"              
                            type = "email"
                            placeholder = "Enter your email"
                            autoComplete="email"
                            value = {this.state.email}
                            onChange = {this.handleChange}
                        />              
                        <input  
                            name = "password"           
                            type = "password"
                            placeholder = "Enter your password"
                            autoComplete="password"
                            title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                            value = {this.state.password}
                            onChange = {this.handleChange}
                        />           
                        <input          
                            name = "confirmPassword"    
                            type = "password"
                            placeholder = "Confirm your password"
                            autoComplete="confirmPassword"
                            value = {this.state.confirmPassword}
                            onChange = {this.handleChange}
                        />
                    </div>    
                    <button onClick={this.handleSubmit}>REGISTER</button> 
                    <p className="form-message">Already have an account? <Link className="link" to={"/login"}> Sign in</Link></p>
                </form>
            </div>
        )
    }
}