const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const tlCtrl = require('../controllers/translation.controller');

const router = express.Router();

router.route('/api/translations')
    .get(tlCtrl.list)
    .post(authCtrl.requireSignin, tlCtrl.create)
    .put(tlCtrl.update);

router.route('/api/translations/:translationId')
    .delete(tlCtrl.remove);

router.route('/api/translations/by/:userId')
    .get(authCtrl.requireSignin, tlCtrl.listByTranslator);

router.route('/api/translations/count/:userId')
    .get(authCtrl.requireSignin, tlCtrl.countTranslationsByUser);

router.route('/api/translations/upvote')
    .put(authCtrl.requireSignin, tlCtrl.upvote);
router.route('/api/translations/rupvote')
    .put(authCtrl.requireSignin, tlCtrl.removeUpvote);

router.route('/api/translations/downvote')
    .put(authCtrl.requireSignin, tlCtrl.downvote);
router.route('/api/translations/rdownvote')
    .put(authCtrl.requireSignin, tlCtrl.removeDownvote);

router.param('translationId', tlCtrl.translationById);
router.param('userId', userCtrl.userByID);

// examples on protecting routes for later
// .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
// .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

module.exports = router;