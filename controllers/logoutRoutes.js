const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/', auth, (req, res) => {
    //destory the session information for logging out
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destorying user session: ', err);
            res.status(500).send('Internal server error - Logout');
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;