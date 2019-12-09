import React from 'react';
import './AddListing.css';
import axios from 'axios';

class AddListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            phoneNumber: '',
            emailAddress: '',
            website: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleNameChange = event => {
        this.setState({
            locationName: event.target.value
        })
    };

    handleAddress1Change = event => {
        this.setState({
            address1: event.target.value
        })
    };

    handleAddress2Change = event => {
        this.setState({
            address2: event.target.value
        })
    };

    handleCityChange = event => {
        this.setState({
            city: event.target.value
        })
    };

    handleStateChange = event => {
        this.setState({
            state: event.target.value
        })
    };

    handleZipChange = event => {
        this.setState({
            zip: event.target.value
        })
    };

    handlePhoneChange = event => {
        this.setState({
            phoneNumber: event.target.value
        })
    };

    handleEmailChange = event => {
        this.setState({
            emailAddress: event.target.value
        })
    };

    handleWebsiteChange = event => {
        this.setState({
            website: event.target.value
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        this.findAndUpdate();
    };

    findAndUpdate() {
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);
                this.updatelistings(res.data);
            });
    };

    updatelistings(listingObj) {
        let id = listingObj._id;
        let listingsArray = [];
        let newListing = {
            "locationName": this.state.locationName,
            "address1": this.state.address1,
            "address2": this.state.address2,
            "city": this.state.city,
            "state": this.state.state,
            "zip": this.state.zip,
            "phoneNumber": this.state.phoneNumber,
            "emailAddress": this.state.emailAddress,
            "subscriptionTier": 0,
            "website": this.state.website
        };

        //console.log(`listing array before: ${JSON.stringify(listingObj.listings)}`);
        let listingsString = "";
        let arrayString = "";
        if (listingObj.listings !== null) {
            listingsArray = listingObj.listings;
            listingsArray.push(newListing);
            arrayString = JSON.stringify(listingsArray);

            listingsString = arrayString;
        } else {
            listingsString = newListing;
        }

        let myListings = JSON.parse(listingsString);
        axios.put('/api/userPortal/' + id, {
            "name": listingObj.name,
            "phone": listingObj.phone,
            "address": listingObj.address,
            "emailAddress": listingObj.emailAddress,
            "password": listingObj.password,
            "listings": myListings
        })
            .then(res => {
                alert(`The listing has been added`);

                this.setState({
                    locationName: "",
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    zip: "",
                    phoneNumber: "",
                    emailAddress: "",
                    website: ""
                });
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div class="form-container">
                <form class="listing-form" onSubmit={this.handleSubmit}>
                    <div class="form-row d-flex justify-content-center" >
                        <div class="form-group col-md-9">
                            <label for="name">Location Name</label>
                            <input
                                class="form-control"
                                id="name" placeholder="Enter your business name here..."
                                value={this.state.locationName}
                                onChange={this.handleNameChange}
                            />
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="address1">Address 1</label>
                            <input
                                type="text"
                                class="form-control"
                                id="address1" placeholder="Eg: 1234 Alphabet Street"
                                value={this.state.address1}
                                onChange={this.handleAddress1Change}
                            />
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="address2">Address 2</label>
                            <input
                                type="text"
                                class="form-control"
                                id="address2" placeholder="Apt number, Studio, or Floor"
                                value={this.state.address2}
                                onChange={this.handleAddress2Change}
                            />
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-3">
                            <label for="city">City</label>
                            <input
                                type="text"
                                class="form-control"
                                id="city" placeholder="City"
                                value={this.state.city}
                                onChange={this.handleCityChange}
                            />
                        </div>


                        <div class="form-group col-md-3">
                            <label for="state">State</label>
                            <input
                                type="text"
                                class="form-control"
                                id="state" placeholder="State"
                                value={this.state.state}
                                onChange={this.handleStateChange}

                            />
                        </div>

                        <div class="form-group col-md-3">
                            <label for="zip">Zip</label>
                            <input
                                type="text"
                                class="form-control"
                                id="address2" placeholder="Zip Code"
                                value={this.state.zip}
                                onChange={this.handleZipChange}

                            />
                        </div>

                        </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="phone">Phone Number</label>
                            <input
                                type="tel"
                                class="form-control"
                                id="phone" placeholder="Enter your phone number here..."
                                value={this.state.phoneNumber}
                                onChange={this.handlePhoneChange}
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-9">
                            <label for="email">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="email" placeholder="name@example.com"
                                value={this.state.emailAdddress}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                    </div>

                    <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-9">
                            <label htmlFor="website">Website</label>
                            <input
                                type="website"
                                className="form-control"
                                id="wesite" placeholder="www.example.com"
                                value={this.state.website}
                                onChange={this.handleWebsiteChange}
                            />
                        </div>
                    </div>

                    <div class="form-row d-flex justify-content-center">
                        <button variant="primary"
                                size="lg"
                                class="btn btn-secondary btn-lg"
                                type="submit"
                                >Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddListing;
