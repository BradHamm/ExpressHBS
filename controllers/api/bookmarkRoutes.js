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

router.get('/bookmark/:id', async (req,res) => {
  
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
})

module.exports = router;