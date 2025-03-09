import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL_GUEST } from "../config/global_constants";

export default class UsersTable extends Component {
  render() {
    return (
      <div id="users-table-container">
        <table id="users-table">
          <thead>
            <tr>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>HOME ADDRESS</th>
              <th>TELEPHONE</th>
              {localStorage.accessLevel > ACCESS_LEVEL_GUEST && <th>ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => (
              <tr key={user._id}>
                <td id="user-name">
                  <img src="/images/user.png" alt="User" />
                  {user["firstName"]} {user["secondName"]}
                </td>
                <td>{user["email"]}</td>
                <td>{user["houseAddress"]}</td>
                <td>{user["telephoneNo"]}</td>
                {localStorage.accessLevel > ACCESS_LEVEL_GUEST && (
                  <td id="action-buttons">
                    <Link to={`/delete-user/${user._id}`}>
                      <button className="delete-button">
                        <img src="/images/delete-icon.png" className="website-icon" alt="Delete" />
                      </button>
                    </Link>
                    <Link to={"/PurchaseHistory/" +user._id}>
                      <button className="purchase-history-button">
                        <p>Purchase history</p>
                      </button>
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
