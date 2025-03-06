import React, { Component } from "react"

export default class UserFilters extends Component {

    handleSearchChange = (e) => {
        this.props.onSearch(e.target.value)
    }

    handleSortChange = (e) => {
        if (this.props.onSort) {
            this.props.onSort(e.target.value)
        }
    }

    render() {
        return (
            <div id="user-filters">
                <div id="filter-toolbar">
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
                    <select onChange={this.handleSortChange}>
                        <option value="default">Sort by</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                    </select>
                    <div id="action-buttons">
                        <button className="add-button">ADD USER</button>
                        <button className="edit-button">EDIT USER</button>
                        <button className="delete-button">DELETE USERS</button>
                    </div>
                </div>
                {/* <div id="filter-results">
                    <p>Showing 0 result of {this.props.users.length} items</p>
                </div> */}
            </div>
        )
    }
}