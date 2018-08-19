const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const mysql = require('mysql');
const db = require('../db');

const router = express.Router();

//Use requireAuth for any request that is executed while signed in
const requireAuth = passport.authenticate('jwt', {session: false});

router.get('/', (req, res) => {
    res.send('user route');
});

router.get('/:userID', requireAuth, (req, res) => {

});

module.exports = router;