const express = require('express');
const router = express.Router();
const { User, Bookmark } = require('../../models');

// Define a GET route
router.get('/allBookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll();

    res.json(bookmarks);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Bookmarks not found during findAll request."})
  }
});

router.get('/bookmark/:id', async (req,res) => { //add auth
  
  const bookmarkId = req.params.id;

  try {
    const bookmark = await Bookmark.findByPk(bookmarkId);
    
    if (!bookmark) {
      return res.status(404).json({ message: "Id not associated with bookmark."})
    }

    res.json(bookmark);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrueve Bookmark ID"});
  }
});

router.post('/newBookmark', async (req, res) => { //add auth
  try {
    const currentUser = await User.findOne({ where: { id: req.session.user_id } });

    if (currentUser) {
      const existingBookmark = await Bookmark.findOne({
        where: { user_id: currentUser.id, url: req.body.url },
      });

      if (existingBookmark) {
        return res.status(400).json({ message: "Bookmark with this URL already exists for the user." });
      }
      const newBookmark = await Bookmark.create({
        name: req.body.name,
        url: req.body.url,
        icon: req.body.icon || "./images/bookmark.svg",
        user_id: currentUser.id,
      });

      res.status(200).json({ message: "Bookmark created successfully", bookmark: newBookmark });
    } else {
      res.status(400).json({ message: "Error with creation of bookmark." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;