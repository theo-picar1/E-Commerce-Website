import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL_GUEST } from "../config/global_constants";

export default class Header extends Component {
    handleSearchChange = (e) => {
        this.props.onSearch(e.target.value);
    };

    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
        }
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            openModal: !prevState.openModal
        }))
    }

    render() {
        const { toggleCartVisibility, cartCounter, showCustomers, searchValue, showCustomersOnClick, showProductsOnClick } =
            this.props;
        return (
            <div id="header">
                <div id="header-content">
                    <div id="website-title">
                        <div id="superments">
                            <p className="title" id="super">SUPER</p>
                            <p className="title">MENTS</p>
                        </div>
                        <div>
                            <img src="/images/website-logo.jpg" className="website-logo" />
                        </div>
                    </div>
                    {!this.props.showCustomers &&
                        <div className="searchbar-container">
                            <input
                                type="text"
                                id="searchbar"
                                placeholder="What are you searching for?"
                                autoComplete="off"
                                value={this.props.searchValue}
                                onChange={this.handleSearchChange}
                            />
                            <img src="/images/search.png" className="website-icon" />
                        </div>
                    }
                    <div id="user-tools">
                        <div onClick={() => toggleCartVisibility()} id="shopping-cart-button">
                            <img src="/images/shopping-cart.png" />
                            <p>{cartCounter}</p>
                        </div>
                        {!this.props.showCustomers ?
                            <button className="change-view-button" onClick={this.props.showCustomersOnClick}>
                                <img src="images/user.png" />
                                <p>CUSTOMERS</p>
                            </button>
                            :
                            <button className="change-view-button" onClick={this.props.showProductsOnClick}>
                                <img src="images/shopping-cart.png" />
                                <p>PRODUCTS</p>
                            </button>
                        }
                        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
                            <div id="user-status-container" onClick={this.toggleModal}>
                                <p id="user-status"></p>
                                <div>
                                    <div id="user-options-button">
                                        <img src="/images/menu-black.png" className="website-icon" />
                                        <img src="/images/user.png" className="website-icon" />
                                    </div>
                                    <div id="user-options" style={{ display: this.state.openModal ? "flex" : "none" }}>
                                        <div>
                                            <p>Edit profile</p>
                                        </div>
                                        <hr />
                                        <div>
                                            <Link className="link" to={"/logout"}><p id="sign-out">Sign out</p></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to={"/login"}>Sign in</Link>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
