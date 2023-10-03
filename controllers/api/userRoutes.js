const express = require('express');
const router = express.Router();
const { User, Bookmark } = require('../../models');

// Define a GET route
router.get('/allUsers', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Users not found during fetch request'});
  }
});

module.exports = router;

router.get('/user/:id', async (req,res) => {

  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      include: Bookmark,
    });

    if (!user) {
      return res.status(404).json({ error: "No users assocaited with that ID"});
    }

    res.json(user);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve User ID'});
  }
})