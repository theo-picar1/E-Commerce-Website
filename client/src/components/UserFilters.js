import React, {Component} from "react"

export default class UserFilters extends Component {
    render() {
        return (
            <div id="user-filters">
                <div id="filter-toolbar">
                    <input 
                        type="text"
                        placeholder="Search by name..."
                    />
                    <select>
                        <option>Name (A-Z)</option>
                        <option>Name (Z-A)</option>
                        <option>Username (A-Z)</option>
                        <option>Username (Z-A)</option>
                    </select>
                    <div id="action-buttons">
                        <button className="add-button">ADD USER</button>
                        <button className="edit-button">EDIT USER</button>
                        <button className="delete-button">DELETE USERS</button>
                    </div>
                </div>
                <div id="filter-results">
                    <p>Showing 0 result of {this.props.users.length} items</p>
                </div>
            </div>
        )
    }
}