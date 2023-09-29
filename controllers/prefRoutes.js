const router = require('express').Router();
// const { User, Bookmark } = require('../../models');
const auth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('preferences');
})

module.exports = router;