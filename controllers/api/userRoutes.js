const express = require('express');
const router = express.Router();
const { User, Bookmark } = require('../../models');
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define a GET route
router.get('/allUsers', async (req, res) => { //add auth
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Users not found during findAll request.'});
  }
});

router.get('/user/:id', async (req,res) => { //add auth

  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Bookmark }],
    });

    if (!user) {
      return res.status(404).json({ error: 'No users assocaited with that ID.' });
    }

    res.json(user);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve User ID.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    bcrypt.compare(req.body.password, userData.password, async (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error during password comparison.', error: err.message });
      } else {
        if (result) {
          console.log("Password match.");

          await new Promise((resolve) => {
            req.session.save(() => {
              req.session.user_id = userData.id;
              req.session.logged_in = true;
              resolve();
            });
          });

          res.status(200).json({ message: 'Login successful.' });
        } else {
          console.log("Incorrect password, try again.");
          res.status(401).json({ message: 'Incorrect password, try again.' });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error: failed login.' });
  }
});

router.post('/signup', async (req,res) => {

  try {
  const isCurrentUser = await User.findOne({ where: { username: req.body.username }});

  if (isCurrentUser) {
    res
    .status(409)
    .json({ message: 'User already exists in the database.' });
    return;
  }
  
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const userData = await User.create({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    theme: 'light', //add functionality to switch between preferences?
  })

  req.session.save(() => {
    req.session.user_id = userData.id;
    // req.session.logged_in = true;

    res.status(200).json({user: userData, message: "User is now logged in"});
  })
} catch(err) {
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((error) => error.message);
    console.log(errors)
    return res.status(400).json({ message: 'Validation error(s)', errors });
  } else {
    console.error(err);
    return res.status(500).json({ message: 'Error: Failed sign-up.' });
  }
}

});

module.exports = router;