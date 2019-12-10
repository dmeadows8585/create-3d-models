/* Dependencies */
var
    userPortal = require('../controllers/userPortal.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

/*
  These method calls are responsible for routing requests to the correct request handler.
 */

router.route('/')
    .get(userPortal.list)
    .post(userPortal.create);

/*
  The ':' specifies a URL parameter.
 */

router.route('/:userByID')
    .get(userPortal.read)
    .put(userPortal.update);

router.route('/:listingByID')
    .delete(userPortal.deleteListing);

router.param('userByID', userPortal.userByID);
router.param('listingByID', userPortal.listingByID);

module.exports = router;
