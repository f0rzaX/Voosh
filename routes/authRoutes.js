const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), (req, res) => {
    const payload = { id: req.user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.redirect(`/api/auth/success?token=${token}`);
});

router.get('/success', (req, res) => {
    const token = req.query.token;
    console.log("The token is:", token)
    res.json({ token });
});

module.exports = router;