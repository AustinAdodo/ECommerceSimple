const express = require('express');
const router = express.Router();
const app = express();
const Album = require('../models/album');
const Purchase = require('../models/purchase');

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// GET /albums - Get a list of all albums in the database
router.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json({ data: albums });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /albums/:id - Return a single album record by id
router.get('/albums/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.status(200).json({ data: album });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/albums', async (req, res) => {
  try {
    const { title, performer, cost } = req.body;
    const newAlbum = new Album({ title, performer, cost });
    const savedAlbum = await newAlbum.save();
    res.status(200).json({ data: savedAlbum });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /albums/:id - Update an existing album record by id
router.put('/albums/:id', async (req, res) => {
  try {
    const { title, performer, cost } = req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      { title, performer, cost },
      { new: true }
    );
    if (!updatedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.status(200).json({ data: updatedAlbum });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /albums/:id - Delete an existing album by id
router.delete('/albums/:id', async (req, res) => {
  try {
    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
    if (!deletedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /purchases - Create a purchase
router.post('/purchases', async (req, res) => {
  try {
    const { user, album } = req.body;
    // Assuming you have the user and album IDs available in the request body,
    // you can create a new Purchase record and store references to the user and album.
    const newPurchase = new Purchase({ user, album });
    const savedPurchase = await newPurchase.save().populate('user album');
    res.status(200).json({ data: savedPurchase });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router to use in the main app
module.exports = router;




//from Body

// const express = require('express');
// const app = express();
// const port = 3000;

// // Middleware to parse JSON and URL-encoded request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route handler for POST request
// app.post('/api/users', (req, res) => {
//   const { username, email } = req.body;
//   // Do something with username and email from the request body
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });