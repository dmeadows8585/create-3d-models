import React, {Component, useState} from 'react'
import axios from 'axios'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class UpdateEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            emailFieldError: '',
            currentEmail: '',
            has_submit: ''
        };

        this.getCurrentEmail();
    };

    handleEmailChange = event => {
        this.setState({
            emailAddress: event.target.value
        }, () => {
            this.emailValidation();
        })
    };

    emailValidation = () => {
        const email = this.state.emailAddress;
        const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

        this.setState({
            emailFieldError: emailValid ? null : 'Email address entered is not in a valid format'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {emailAddress} = this.state;
        if (emailAddress !== "" && !this.state.emailFieldError) {
            this.state.has_submit = 'true';
            this.setState({has_submit:this.state.has_submit});
            //alert(`Updated Email Address: ${emailAddress}`);

            this.findAndUpdate();
        } else {
            this.state.has_submit = 'false';
            this.setState({has_submit:this.state.has_submit});
            //alert(`The email address submitted must be in valid form`)
        }
    };

    getCurrentEmail() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.setState({currentEmail: res.data.emailAddress})
            });
    }

    findAndUpdate() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.updateEmailPreference(res.data);
            });
    }

    refreshPage() {
        window.location.reload();
    }

    updateEmailPreference(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "name": userInfo.name,
            "address": userInfo.address,
            "phone": userInfo.phone,
            "emailAddress": this.state.emailAddress,
            "password": userInfo.password,
            "listings": userInfo.listings
        })
            .then(res => {
                this.setState({
                    currentEmail: this.state.emailAddress
                }, () => {
                    this.setState({emailAddress: ""})
                });
                console.log(res);
                console.log(res.data);
            });
        this.refreshPage();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row d-flex justify-content-center">
                        <div className="form-group col-md-9">
                            <label htmlFor="emailPreference">Email</label>
                            <input name="emailPreference"

                                   className={`form-control ${this.state.emailFieldError ? 'is-invalid' : ''}`}
                                   id="emailPreference"
                                   placeholder="Enter email"
                                   value={this.state.emailAddress}
                                   onChange={this.handleEmailChange}
                                   onBlur={this.emailValidation}
                            />
                            <div className='invalid-feedback'>{this.state.emailFieldError}</div>
                        </div>
                    </div>
                    <div class="form-row d-flex justify-content-center">
                        <Modal_display
                            has_submit={this.state.has_submit}/>
                    </div>
                </form>
            </div>

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
                    <Modal.Body>Your email preferences have been updated successfully!</Modal.Body>
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
                    <Modal.Body>Your email preferences were not changed, please try again.</Modal.Body>
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

export default UpdateEmail;
