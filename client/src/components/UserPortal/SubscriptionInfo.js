import React from 'react';
import PayPalButton from './PayPalButton'
import axios from 'axios';
import './UserListings.css';
var CLIENT = require('../../config/config.js');


//Throws warnings when comparing in PriceDisplay
//Needs selectedTier to be an number

const ENV = 'sandbox' //I only have access to sandbox testing currently

class SubscriptionInfo extends React.Component {
    //This holds the state of the subscription level dropdown box
    //priceLevel will eventually be used to display the correct pricepoints.
    constructor(props) {
        super(props);
        this.state = {
            _id: "5ddf0e8272dc6e51d29c7df6", //FIXME: Right now its hard coded to the first user, but will need to update later
            subscriptionTier: -1,
            listings: [],
            selectedListing: "",
            selectedTier: "",
            priceLevel: ""
        };
    }


    componentWillMount() {
        axios.get('/api/userPortal')
            .then(res => {
                console.log(res);
                res.data.find((info) => {
                    if (info._id === this.state._id) {
                       this.setState({
                           listings: info.listings
                       })
                    }
                })
            });
    }

    selectedListing(_id) {

        var tier
        this.state.listings.find((info) => {
            if (info._id === _id) {
                tier = info.subscriptionTier
                return true;
            }
            else {
                tier = 0
            }
        })

        this.setState({
          selectedListing: _id,
          subscriptionTier: tier,
          selectedTier: ""
        })
    }

    selectedTier(value) {
        this.setState({
            selectedTier: value
        })
    }


    render() {

        return (
            <div
            class="row"
            >
            

                <ListingSelector
                    listings={this.state.listings}
                    selectedListing={this.selectedListing.bind(this)}
                />

                <div className="column2 col-md-8"
                    id="subscriptionAll"
                >

                    <SubscriptionSelector
                        selectedListing={this.state.selectedListing}
                        subscriptionTier={this.state.subscriptionTier}
                        selectedTier={this.selectedTier.bind(this)}
                    />

                    <PriceDisplay
                            selectedTier={this.state.selectedTier}
                            subscriptionTier={this.state.subscriptionTier}
                    />

                    <BenefitsDisplay
                            selectedTier={this.state.selectedTier}
                    />

                    <CheckoutButtonDisplay
                        selectedTier={this.state.selectedTier}
                        subscriptionTier={this.state.subscriptionTier}
                        _id={this.state._id}
                        selectedListing={this.state.selectedListing}
                    />
                </div>
            </div>
        )
    }
}

function ListingSelector(props) {
    const listingList = props.listings
		.map(listing => {
			return (
				<tr key={listing._id} onClick={() => props.selectedListing(listing._id)}>
					<td> {listing.locationName} </td>
				</tr>
			);
		});

		return (
    
            <div class="col-md-3" id='column1'>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">My Listings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>{listingList}</tr>
                    </tbody>
                </table>
            </div>
		)
}

function SubscriptionSelector(props) {
    const subscriptionTier = props.subscriptionTier;

    //Show only subscription levels in the drop down that are higher than the listing's
    //current level
    if (subscriptionTier === 0) {
        return (
            <div>
                <p>Your current subscription level:</p>
                <br/>
                <p class="text-center subscription">Free Listing</p>
                <br/>

                <br/>
                <p>Your current benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    <br/>
                </p>

                <p>Upgrade subscription:
                    <select
                        className="browser-default custom-select"
                        //value={this.state.selectedTier}
                        onChange={(e) => props.selectedTier(e.target.value)}
                        id = "subscriptionSelector"
                    >
                        <option>Choose your option</option>
                        <option value="1">Basic Listing</option>
                        <option value="2">Premium Listing</option>
                        <option value="3">Splash Page Listing</option>
                    </select>
                </p>
            </div>
        );
    }
    else if (subscriptionTier === 1) {
        return (
            <div>
                <p>Your current subscription level:</p>
                <br/>
                <p class="text-center subscription">Basic Listing</p>
                <br/>

                <br/>
                <p>Your current benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    Photos, videos, or existing 360 imagery <br/>
                    <br/>
                </p>

                <p>Upgrade subscription:
                    <select
                        className="browser-default custom-select"
                        //value={this.state.selectedTier}
                        onChange={(e) => props.selectedTier(e.target.value)}
                        id = "subscriptionSelector"
                    >
                        <option>Choose your option</option>
                        <option value="2">Premium Listing</option>
                        <option value="3">Splash Page Listing</option>
                    </select>
                </p>
            </div>
        );
    }
    else if (subscriptionTier === 2) {
        return (
            <div>
                <p>Your current subscription level:</p>
                <br/>
                <p class="text-center subscription">Premium Listing</p>
                <br/>

                <br/>
                <p>Your current benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    Professional 360 imagery of business <br/>
                    <br/>
                </p>

                <p>Upgrade subscription:
                    <select
                        className="browser-default custom-select"
                        //value={this.state.selectedTier}
                        onChange={(e) => props.selectedTier(e.target.value)}
                        id = "subscriptionSelector"
                    >
                        <option>Choose your option</option>
                        <option value="3">Splash Page Listing</option>
                    </select>
                </p>
            </div>
        );
    }
    else if (subscriptionTier === 3) {
        return (
            <div>
                <p>Your current subscription level:</p>
                <br/>
                <p class="text-center subscription">Splash Page Listing</p>
                <br/>

                <br/>
                <p>Your current benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    Professional 360 imagery of business <br/>
                    360 image uploaded to Google Maps and placement on Google My Business <br/>
                    Link to Premium Listing (included) <br/>
                    <br/>
                </p>
            </div>
        );
    }
    else {
        return (
            <div>
                <p>Click on a listing to see your subscription details</p>
            </div>
        );
    }
}

// Uses conditional rendering
// This function asks for the state of the selector dropdown and returns the appropriate price.
// Prices are undetermined.
// Props are passed in through the call to the function in render
// Any number of extra props can be added by including them in the call.
// Double equal is used because selectedTier is technically a string
function PriceDisplay(props) {
    const selected = props.selectedTier.valueOf();
    const currentTier = props.subscriptionTier.valueOf();
    var amountPaid = 0;
    var upgradeCost = 0;

    //Determine how much has already been paid
    if (currentTier == 1) {
        amountPaid = 59
    }
    else if (currentTier == 2) {
        amountPaid = 89
    }
    else if (currentTier == 3) {
        amountPaid = 199
    }
    else {
        amountPaid = 0
    }

    //Determine how much to pay for the upraded subscription tier
    if (selected == 1) {
        upgradeCost = 59 - amountPaid;
    } else if (selected == 2){
        upgradeCost = 89 - amountPaid;
    } else if (selected == 3){
        upgradeCost = 199 - amountPaid;
    } else {
        return null;
    }

    return(
        <div>
            <br/>
            <p>Price to upgrade:</p>
            <p class="text-center subscription">${upgradeCost}.00</p>
        </div>
    );

}

//This only displays the button for now.
//When making the secure checkout system, it'll have to link to that.
//Unsure of how the checkout system will be implemented, but I don't think that the price point really needs to be saved
//It would just link to the respective checkout page that would have the correct price already.
function CheckoutButtonDisplay(props) {
    const selected = props.selectedTier.valueOf();
    const currentTier = props.subscriptionTier.valueOf();
    const selectedListing = props.selectedListing;
    var amountPaid = 0;
    var upgradeCost = 0;

    if (selected > 0) {

        const onSuccess = (payment) =>
            console.log('Successful payment!', payment);

        const onError = (error) =>
            console.log('Erroneous payment OR failed to load script!', error);

        const onCancel = (data) =>
            console.log('Cancelled payment!', data);


       //Determine how much has already been paid
        if (currentTier == 1) {
            amountPaid = 59
        }
        else if (currentTier == 2) {
            amountPaid = 89
        }
        else if (currentTier == 3) {
            amountPaid = 199
        }
        else {
            amountPaid = 0
        }

        //Determine how much to pay for the upraded subscription tier
        if (selected == 1) {
            upgradeCost = 59 - amountPaid;
        } else if (selected == 2){
            upgradeCost = 89 - amountPaid;
        } else if (selected == 3){
            upgradeCost = 199 - amountPaid;
        } else {
            return null;
        }

        return(
            <div
                class="form-row d-flex justify-content-center"
            >
                <div>
                    <PayPalButton
                     env={ENV}
                     commit={true}
                     amount={upgradeCost}
                     newTier={selected}
                     _id={props._id}
                     selectedListing={selectedListing}
                     clientId={CLIENT.sandbox}
                     currency="USD"
                     shippingPreference={"NO_SHIPPING"}
                     style={{}}
                     total={100}
                     onSuccess={onSuccess}
                     onError={onError}
                     onCancel={onCancel}
                    />
                </div>
            </div>
        );
    } else {
        return null;
    }

}

function BenefitsDisplay(props) {
    const selected = props.selectedTier.valueOf();

    //Set the description based on the chosen subscription tier level
    if (selected == 1) {
        return (
            <div>
                <p>Upgraded benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    <b>Photos, videos, or existing 360 imagery</b> <br/>
                    <br/>
                </p>
            </div>
        )
    }
    else if (selected == 2) {
        return (
            <div>
                <p>Upgraded benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    <b>Professional 360 imagery of business</b> <br/>
                    <br/>
                </p>
            </div>
        )
    }
    else if (selected == 3) {
        return (
            <div>
                <p>Upgraded benefits:</p>
                <br/>
                <p class="text-center subscription">
                    Business Name <br/>
                    Business Address with a location on Google Maps <br/>
                    Phone Number <br/>
                    Link to your website <br/>
                    <b>Professional 360 imagery of business</b> <br/>
                    <b>360 image uploaded to Google Maps and placement on Google My Business</b> <br/>
                    <b>Link to Premium Listing (included)</b> <br/>
                    <br/>
                </p>
            </div>
        )
    }
    else {
        return (
            <p></p>
        )
    }
}
export default SubscriptionInfo;