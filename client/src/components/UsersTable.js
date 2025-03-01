import React, {Component} from "react"

export default class UsersTable extends Component {
    render() {
        return(
            <div id="users-table-container">
                <table id="users-table">
                    <thead>
                        <tr>
                            <th>USERNAME</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>HOME ADDRESS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(user =>
                            <tr key={user._id}>
                                <td>username here</td>
                                <td>{user["name"]}</td>
                                <td>{user["email"]}</td>
                                <td>31 Park Heath, Grangerath, Drogheda, Co. Meath</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}