/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Added schema
var listingSchema = new Schema({
    userId: {type: Number, required: true, unique: true},
    listings: [{
        locationName: {type: String},
        address1: {type: String},
        address2: {type: String},
        city: {type: String},
        state: {type: String},
        zip: {type: String},
        phoneNumber: {type: String},
        emailAddress: {type: String}
    }],
    start_hour: {
        type: Number,
        min: 0,
        max: 12
    },
    start_minute: {
        type: Number,
        min: 0,
        max: 60
    },
    start_part: {
        type: String,
        enum: ['AM', 'PM']
    },
    end_hour: {
        type: Number,
        min: 0,
        max: 12
    },
    end_minute: {
        type: Number,
        min: 0,
        max: 60
    },
    end_part: {
        type: String,
        enum: ['AM', 'PM']
    },
    service: String,
    accessibility: Boolean,
    created_at: Date,
    updated_at: Date
    //Maybe add coordinates to be used with location on 360 homepage photo
    //Service needs to be added as a drop down menu
    //Need to figure out how to create types for each listing's service (restaurant, gas, medical, housing)
    //Accessibility also needs drop down
});

/* Use your schema to instantiate a Mongoose model */
// var EmailPreference = mongoose.model('EmailPreference', emailSchema);

//Added save to userPortal schema
listingSchema.pre('save', function (next) {
    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});
var Listings = mongoose.model('Listings', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listings;
