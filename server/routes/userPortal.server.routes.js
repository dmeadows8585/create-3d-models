/* Dependencies */
var
    userPortal = require('../controllers/userPortal.server.controller.js')
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

/*
  These method calls are responsible for routing requests to the correct request handler.
 */
// router.route('/')
//     .get(contactInfo.list, emailPreferences.list)
//     .post(contactInfo.create, emailPreferences.create);

router.route('/')
    .get(userPortal.list)
    .post(userPortal.create);

/*
  The ':' specifies a URL parameter.
 */
// router.route('/:contactInfoId')
//     .get(contactInfo.read, emailPreferences.read)
//     .put(contactInfo.update, emailPreferences.update)
//     .delete(contactInfo.delete);
router.route('/:userByID')
    .get(userPortal.read)
    .put(userPortal.update)
    .delete(userPortal.delete);

router.param('userByID', userPortal.userByID);


module.exports = router;