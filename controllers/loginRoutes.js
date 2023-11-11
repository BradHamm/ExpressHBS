const express = require('express');
const router = express.Router();
const { User } = require('../models');

//these are the routes for the login page, not including the actual interactions with the user model itself

router.get('/', (req,res) => {
    res.render('login')
});

module.exports = router;

