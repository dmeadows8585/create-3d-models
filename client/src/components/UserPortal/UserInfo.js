import React, {Component} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import './UserInfo.css'
import Address from "../../assets/address-icon.png";
import UserIcon from "../../assets/GreyUserIcon.png";
import Phone from "../../assets/phone-icon.png";
import Email from "../../assets/Email.png";

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            address: '',
            emailAddress: ''
        };

        this.getCurrentInformation();
    };

    getCurrentInformation() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.setState(
                    {
                        name: res.data.name,
                        phone: res.data.phone,
                        address: res.data.address,
                        emailAddress: res.data.emailAddress
                    }
                )
            });
    }

    render() {
        return (
            <div id="customUserInfo">
                <Table striped bordered variant="dark">
                    <thead>
                        <tr>
                            <th>
                                User Information
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            Name: {this.state.name}
                            <img className="table-icon" src={UserIcon} id="userIcon"/>
                        </td>
                    </tr><tr>
                        <td>Phone Number: {this.state.phone}
                            <img className="table-icon" src={Phone} id="userAddress"/>
                        </td>
                    </tr><tr>
                        <td>Address: {this.state.address}
                            <img className="table-icon" src={Address} id="userPhone"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Username: {this.state.emailAddress}
                            <img className="table-icon" src={Email} id="userEmail"/>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default UserInfo;
