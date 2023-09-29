const router = require('express').Router();

const apiRoutes = require('./api');
const dashRoutes = require('./dashRoutes');
const prefRoutes = require('./prefRoutes');
const aboutRoutes = require('./aboutRoutes')

//routers to be used for querying the information from the models, to be rendered onto the webpage.
router.use('/', dashRoutes);
router.use('/preferences', prefRoutes);
router.use('/about', aboutRoutes);
router.use('/api', apiRoutes);

module.exports = router;