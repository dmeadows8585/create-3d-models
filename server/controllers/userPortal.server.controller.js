/* Dependencies */
var mongoose = require('mongoose'),
    UserPortal = require('../models/userPortal.server.model.js');

/* Create an User Portal information account*/
exports.create = function (req, res) {

    /* Instantiate an User Portal account*/
    var userInfo = new UserPortal(req.body);

    /* Then save the User Portal information */
    userInfo.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(userInfo);
            console.log(userInfo);
        }
    });
};

/* Show the current Portal information */
exports.read = function (req, res) {
    /* send back the information as json from the request */
    res.json(req.userInfo);
};

/* Update User Portal info - note the order in which this function is called by the router*/
exports.update = function (req, res) {
    var userInfo = req.userInfo;

    /* Replace the info properties with the new properties found in req.body */
    UserPortal.findByIdAndUpdate(userInfo._id, {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        listings: req.body.listings
    }, {new: true})
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.req.userInfo._id
                });
            }
            res.send(result);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.req.userInfo._id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.req.userInfo._id
        });
    });
};

/* Delete the User Portal account */
exports.delete = function (req, res) {
    var userInfo = req.userInfo;
    UserPortal.findByIdAndRemove(userInfo._id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "user info not found with id " + userInfo._id
                });
            }
            res.send({message: "user info deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + userInfo._id
            });
        }
        return res.status(500).send({
            message: "Could not delete user info with id " + userInfo._id
        });
    });

};

/* Delete a user listing */
exports.deleteListing = function (req, res) {
    var userInfo = req.userInfo;
    console.log(userInfo[0]._id);
    console.log(userInfo);
    console.log(req.userlisting._id);
    UserPortal.findOneAndUpdate(
        {_id: userInfo[0]._id},
        {$pull: {listings: {_id: req.userlisting._id}}},

        {new: true},
        function (err) {
            if (err) {
                console.log(err)
            }
        }
    )
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "user listing not found with id " + userInfo._id
                });
            }
            res.send({message: "user listing deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + userInfo._id
            });
        }
        return res.status(500).send({
            message: "Could not delete listing info with id " + userInfo._id
        });
    });

};

/* Retrieve all the user's info, sorted alphabetically by userId */
exports.list = function (req, res) {
    UserPortal.find()
        .sort({userId: 1})
        .then(addresses => {
            res.send(addresses);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user infomation."
        });
    });
};

/*
  Middleware: find user information by its ID, then pass it to the next request handler.
 */
exports.userByID = function (req, res, next, id) {
    UserPortal.findById(id).exec(function (err, userInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.userInfo = userInfo;
            next();
        }
    });
};

/*
  Middleware: find user information by its ID, then pass it to the next request handler.
 */
exports.listingByID = function (req, res, next, id) {
    UserPortal.find({"listings._id": id}).exec(function (err, userInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(id);

            for (let i = 0; i < userInfo[0].listings.length; i++) {
                if (userInfo[0].listings[i]._id == id) {
                    req.userlisting = userInfo[0].listings[i];
                    req.userInfo = userInfo;
                }
            }
            console.log(req.userInfo);
            next();
        }
    });
};
