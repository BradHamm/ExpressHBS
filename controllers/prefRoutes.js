const router = require('express').Router();
const { Bookmark, User } = require('../models');
// const { User, Bookmark } = require('../../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const userId = req.session.user_id; 
        const bookmarks = await Bookmark.findAll({
            where: { user_id: userId },
        });
        const userInfo = await User.find({
            where: {id: userId} 
        })

        res.render('preferences', { bookmarks, userInfo, logged_in: req.session.logged_in });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;