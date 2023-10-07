const express = require('express');
const router = express.Router();
const Album = require('../models/album');
const Purchase = require('../models/purchase');

// Middleware to parse JSON and URL-encoded request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// GET /albums
router.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json({ data: albums });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /albums/:id
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

// POST /albums
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

// PUT /albums/:id
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

// DELETE /albums/:id
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

// POST /purchases
router.post('/purchases', async (req, res) => {
  try {
    const { user, album } = req.body;
    const newPurchase = new Purchase({ user, album });
    const savedPurchase = await newPurchase.save();

    // Use populate to include user and album data in the response
    await savedPurchase.populate('user album').execPopulate();

    res.status(200).json({ data: savedPurchase });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


//npm install node-cache --save
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

//const Cache = require('node-cache');
// const cachedData = _cache.get(id);
// if (cachedData) {
//   return res.json(cachedData);
// }



