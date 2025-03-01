import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL_GUEST } from "../config/global_constants";

export default class Header extends Component {
  handleSearchChange = (e) => {
    this.props.onSearch(e.target.value);
  };

  render() {
    const { toggleCartVisibility, cartCounter, showCustomers, searchValue, showCustomersOnClick, showProductsOnClick } =
      this.props;

    return (
      <div id="header">
        <div id="header-content">
          <div id="website-title">
            <div id="superments">
              <p className="title" id="super">
                SUPER
              </p>
              <p className="title">MENTS</p>
            </div>
            <div>
              <img src="/images/website-logo.jpg" className="website-logo" />
            </div>
          </div>
          {!showCustomers && (
            <div className="searchbar-container">
              <input
                type="text"
                id="searchbar"
                placeholder="What are you searching for?"
                autoComplete="off"
                value={searchValue}
                onChange={this.handleSearchChange}
              />
              <img src="/images/search.png" className="website-icon" />
            </div>
          )}
          <div id="user-tools">
            <div onClick={() => toggleCartVisibility()} id="shopping-cart-button">
              <img src="/images/shopping-cart.png" />
              <p>{cartCounter}</p>
            </div>
            {!showCustomers ? (
              <button className="change-view-button" onClick={showCustomersOnClick}>
                <img src="images/user.png" />
                <p>CUSTOMERS</p>
              </button>
            ) : (
              <button className="change-view-button" onClick={showProductsOnClick}>
                <img src="images/shopping-cart.png" />
                <p>PRODUCTS</p>
              </button>
            )}
            {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
              <Link to={"/logout"}>Log out</Link>
            ) : (
              <Link to={"/login"}>Sign in</Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}