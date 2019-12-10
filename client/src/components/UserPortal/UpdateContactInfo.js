import React, {Component, useState} from 'react'
import axios from 'axios'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class UpdateContactInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            address: '',
            nameFieldError: '',
            phoneFieldError: '',
            has_submit: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        }, () => {
            this.nameValidation();
        })
    };

    handlePhoneChange = event => {
        this.setState({
            phone: event.target.value
        }, () => {
            this.phoneValidation();
        })
    };

    handleAddressChange = event => {
        this.setState({
            address: event.target.value
        })
    };

    nameValidation = () => {
        const name = this.state.name;
        this.setState({
                nameFieldError: name.length > 1 ? null :
                    'Name must be longer than 1 character'
            }
        )
    };

    phoneValidation = () => {
        const phone = this.state.phone;
        this.setState({
            phoneFieldError: phone.length > 9 ? null : 'Phone number must be longer than 10 numbers'
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {name, phone, address, nameFieldError, phoneFieldError} = this.state;
        if (name !== "" && !nameFieldError && phone !== "" && !phoneFieldError) {
            //alert(`name: ${name}\nphone number: ${phone}\naddress: ${address}`);
            this.state.has_submit = 'true';
            this.setState({has_submit:this.state.has_submit});
            this.findAndUpdate();
        } else {
            this.state.has_submit = 'false';
            this.setState({has_submit:this.state.has_submit});
            //alert(`Submission requires Name and Phone Number fields must be filled out.`)
        }

    };

    findAndUpdate() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.updateContactInfo(res.data);
            });
    }

    refreshPage() {
        window.location.reload();
    }

    updateContactInfo(userInfo) {
        let id = userInfo._id;
        axios.put('/api/userPortal/' + id, {
            "name": this.state.name,
            "phone": this.state.phone,
            "address": this.state.address,
            "emailAddress": userInfo.emailAddress,
            "password": userInfo.password,
            "listings": userInfo.listings
        })
            .then(res => {
                this.setState({
                    name: "",
                    phone: "",
                    address: ""
                });
                console.log(res);
                console.log(res.data);
            });
        //this.refreshPage();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row d-flex justify-content-center">
                    <div className="form-group col-md-9">
                        <label htmlFor="name">Name</label>
                        <input name="name"
                               className={`form-control ${this.state.nameFieldError ? 'is-invalid' : ''}`}
                               id="name" placeholder="Enter name"
                               value={this.state.name}
                               onChange={this.handleNameChange}
                               onBlur={this.nameValidation}
                        />
                        <div className='invalid-feedback'>{this.state.nameFieldError}</div>
                    </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                    <div className="form-group col-md-9">
                        <label htmlFor="phone">Phone Number</label>
                        <input name="phone"

                               className={`form-control ${this.state.phoneFieldError ? 'is-invalid' : ''}`}
                               id="phone"
                               placeholder="Enter phone number (###-###-####)"
                               value={this.state.phone}
                               onChange={this.handlePhoneChange}
                               onBlur={this.phoneValidation}
                               pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        />
                        <div className='invalid-feedback'>{this.state.phoneFieldError}</div>
                    </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                    <div className="form-group col-md-9">
                        <label htmlFor="address">Address</label>
                        <input name="address"

                               className={`form-control`}
                               id="address"
                               placeholder="Enter address (optional)"
                               value={this.state.address}
                               onChange={this.handleAddressChange}
                        />
                    </div>
                </div>
                <div class="form-row d-flex justify-content-center">
                    <Modal_display
                        has_submit={this.state.has_submit}
                        name={this.state.name}
                        phone={this.state.phone}
                        address={this.state.address}
                    />
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
    const name = props.name;
    const address = props.address;
    const phone = props.phone;
    //When I tried to use the name address and phone to be similar to the other alert, it would display
    //and then just revert back to the names of the variables.

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
                    <Modal.Body>Your contact information has been updated successfully!</Modal.Body>
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
                    <Modal.Body>Submission requires Name and Phone Number fields must be filled out.</Modal.Body>
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

export default UpdateContactInfo;
