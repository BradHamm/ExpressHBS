const router = require('express').Router();
const { Bookmark, User } = require('../models'); //get from index?
// const { User, Bookmark } = require('../../models');
const auth = require('../utils/auth');


//retrieve the user information from the key provided in local storage
//use that user instance value (say, id) to retrieve all bookmarks associated with that user
//pass them to the page to be rendered under Bookmarks

router.get('/', (req, res) => {
    // try {
    //     const bookmarkData = await Bookmark.findAll({
    //         include: [
    //             {

    //             }
    //         ]
    //     })
    // }

    res.render('dashboard');
})

module.exports = router;