import React, {Component} from "react"

export default class UsersTable extends Component {
    render() {
        return(
            <div id="users-table-container">
                <table id="users-table">
                    <thead>
                        <tr>
                            <th>FULL NAME</th>
                            <th>EMAIL</th>
                            <th>HOME ADDRESS</th>
                            <th>TELEPHONE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(user =>
                            <tr key={user._id}>
                                <td id="user-name">
                                    <img src="/images/user.png" />
                                    {user["firstName"]} {user["secondName"]}
                                </td>
                                <td>{user["email"]}</td>
                                <td>{user["houseAddress"]}</td>
                                <td>{user["telephoneNo"]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}