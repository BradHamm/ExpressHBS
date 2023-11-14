const router = require('express').Router();
const { Bookmark, User } = require('../models'); //get from index?
// const { User, Bookmark } = require('../../models');
const auth = require('../utils/auth');


//retrieve the user information from the key provided in local storage
//use that user instance value (say, id) to retrieve all bookmarks associated with that user
//pass them to the page to be rendered under Bookmarks


router.get('/', auth, async (req, res) => {
    try {
        // Assuming the user is authenticated at this point
        const userId = req.session.user_id; // Adjust to use the correct property for user ID

        const bookmarks = await Bookmark.findAll({
            where: { user_id: userId },
        });

        res.render('dashboard', { bookmarks, logged_in: req.session.logged_in });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;