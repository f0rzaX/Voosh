const express = require('express')
const router = express.Router();
const passport = require('passport');
const { getProfile, updateProfile, getAllPublicProfiles, getAllProfiles } = require('../controllers/userController');

router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);

router.put('/me', passport.authenticate('jwt', {session: false}), updateProfile);

module.exports = router;