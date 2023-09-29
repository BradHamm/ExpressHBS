const express = require('express');
const router = express.Router();

// Define a GET route
router.get('/', (req, res) => {
  // Handle the GET request logic here
  res.send('This is the user route.');
});

module.exports = router;