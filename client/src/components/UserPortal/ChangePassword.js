import React, {Component, useState} from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newpass: '',
            newpassconfirm: '',
            passwordFieldError: '',
            has_submit: '',
        };
    };

    handlePasswordChange = event => {
        this.setState({
            newpass: event.target.value
        }, () => {
            this.passwordValidation();
        })
    };

    handlePasswordChangeConfirm = event => {
        this.setState({
            newpassconfirm: event.target.value
        }, () => {
            this.passwordValidation();
        })
    };

    passwordValidation = () => {
        const password1 = this.state.newpass;
        const password2 = this.state.newpassconfirm;
        this.setState({
                passwordFieldError: password1 === password2 ? null :
                    'The passwords do not match.'
            }
        )
    };

    handleSubmit = event => {
        event.preventDefault();
        const {newpass} = this.state;
        const {newpassconfirm} = this.state;
        if (newpass !== "" && !this.state.passwordFieldError) {
            this.state.has_submit = 'true';
            this.setState({has_submit:this.state.has_submit});
            //alert(`Password has been Updated`);

            this.findAndUpdate();
        } else {
            this.state.has_submit = 'false';
            this.setState({has_submit:this.state.has_submit});
            //alert(`The password was NOT updated`)
        }
    };

    findAndUpdate() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.updatePasswordPreference(res.data);
            });
    }

    updatePasswordPreference(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "name": userInfo.name,
            "address": userInfo.address,
            "phone": userInfo.phone,
            "emailAddress": userInfo.emailAddress,
            "password": this.state.newpass,
            "listings": userInfo.listings
        })
            .then(res => {
                this.setState({
                    newpass: "",
                    newpassconfirm: ""
                });
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row d-flex justify-content-center">
                <div className="form-group col-md-9">
                    <label htmlFor="password">Enter your new password</label>
                    <input name="name"
                           className={`form-control ${this.state.passwordFieldError ? 'is-invalid' : ''}`}
                           id="password"
                           placeholder="Enter your new password"
                           value={this.state.newpass}
                           onChange={this.handlePasswordChange}
                           onBlur={this.passwordValidation}
                    />
                    <div className='invalid-feedback'></div>
                    </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                <div className="form-group col-md-9">
                    <label htmlFor="password2">Confirm your new password</label>
                    <input name="password2"
                           className={`form-control ${this.state.passwordFieldError ? 'is-invalid' : ''}`}
                           id="password2"
                           placeholder="Enter your new password again"
                           value={this.state.newpassconfirm}
                           onChange={this.handlePasswordChangeConfirm}
                           onBlur={this.passwordValidation}
                    />
                    <div className='invalid-feedback'>{this.state.passwordFieldError}</div>
                </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                    <Modal_display
                        has_submit={this.state.has_submit}/>
                </div>
            </form>
        )
    }
}

function Modal_display(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const has_submit = props.has_submit;

    if (has_submit==='true') {
        return (
            <>
                <button type="submit"
                        className="btn btn-secondary btn-lg"
                        onClick={handleShow}>Submit
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your Password has been updated successfully!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else if (has_submit === 'false' || has_submit ===''){
        return (
            <>
                <button type="submit"
                        className="btn btn-secondary btn-lg"
                        onClick={handleShow}>Submit
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your password was not changed, please try again.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else {
        return (
            <button type="submit" onClick={handleShow} className="btn btn-secondary btn-block">
                Login
            </button>
        );
    }
}

export default ChangePassword;
