import React from "react"
import ViewListing from './ViewListing'
import './UserListings.css';
import axios from 'axios'

class UserListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: [],
            selectedListing: 0,
        };

        this.getCurrentInformation();
    }

    selectedUpdate(id) {
        this.setState({
            selectedListing: id
        });
    }

    getCurrentInformation() {
        let listings;
        axios.get('/api/userPortal/' + sessionStorage.getItem(this.key))
            .then(res => {
                console.log(res);

                listings = res.data.listings
                this.setState({
                    listings: res.data.listings
                });
            });
    }

    render() {

        //I left the text filtering functionality in here commented out in case we want to use it
        let data = this.state.listings;
        let listingList = data
        /*.filter(listing => {
            return listing.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) >= 0
        })*/
            .map(listing => {
                return (
                    <tr key={listing._id} onClick={() => this.selectedUpdate(listing._id)}>
                        <td> {listing.locationName} </td>
                    </tr>
                );
            });

        return (

            <div class="row">
                <div class="col-md-3" id='column1'>
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">My Listings</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{listingList}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="column2 col-md-6">
                    <ViewListing
                        selectedListing={this.state.selectedListing}
                        data={data}
                    />
                </div>
            </div>
        )
    }
}

export default UserListings;
