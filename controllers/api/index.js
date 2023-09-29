const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookmarkRoutes = require('./bookmarkRoutes');

//routers used for manipulating the data within the db, following CRUD principles/
router.use('/users', userRoutes);
router.use('/bookmarks', bookmarkRoutes);

module.exports = router;