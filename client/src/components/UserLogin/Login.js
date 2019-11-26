import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            username: '',
            password: '',
            userFieldError: '',
            passwordFieldError: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
    };

    loginUpdate(userId) {
        if (userId !== '') {
            this.props.loginUpdate(userId);
        }
    }

    handleUserChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    handlePassChange = event => {
        this.setState({
            password: event.target.value
        });
    };

    handleLogin = event => {
        event.preventDefault();
        let success = false;
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);

                res.data.find((userInfo) => {
                    if (userInfo.emailAddress === this.state.username && userInfo.password === this.state.password) {
                        success = true;
                        this.loginUpdate(userInfo._id);
                    }
                });
                if (success) {
                    alert('You are logged in');
                    this.props.history.push("/Portal");
                } else {
                    alert('Incorrect Username or Password');
                }
            });
    };

    usernameValidation = () => {
        const username = this.state.username;
        this.setState({
                userFieldError: (username.length > 1 && username.includes("@") && username.includes(".")) ? null :
                    'Please enter a valid email address'
            }
        )
    };

    //This can be changed later to meet whatever password requirements are necessary
    //Just add them to the ternary statement
    passwordValidation = () => {
        const password = this.state.password;
        this.setState({
                passwordFieldError: (password.length >= 5) ? null :
                    'Please enter a password with more than 5 characters'
            }
        )
    };

    render() {
        return (
            <div id="myLoginBox">
                <form className="justify-content-center" onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label htmlFor="Login">Username</label>
                        <input
                            value={this.state.username}
                            className={`form-control ${this.state.userFieldError ? 'is-invalid' : ''}`}
                            placeholder="Enter your username"
                            onChange={this.handleUserChange}
                            onBlur={this.usernameValidation}
                        />
                        <div className='text-danger'>{this.state.userFieldError}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <input
                            type="password"
                            value={this.state.password}
                            className={`form-control ${this.state.passwordFieldError ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                            onChange={this.handlePassChange}
                            onBlur={this.passwordValidation}
                        />
                        <div className='text-danger'>{this.state.passwordFieldError}</div>
                    </div>
                    <button type="submit"
                            className="btn btn-primary btn-block">Login
                    </button>
                </form>
            </div>
        )
    }

}

Login = withRouter(Login);
export default Login
