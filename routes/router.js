const express = require("express");
const router = express.Router();
const Album = require("../models/album");
const Purchase = require("../models/purchase");
const User = require("../models/user");
const session = require('express-session'); //

// Middleware to parse JSON and URL-encoded request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
//Implement Caching and Pagination.

//middleware for Authentcation
// app.use(session({
//   secret: 'devops',
//   resave: false,
//   saveUninitialized: true,
// }));

// const checkAuth = (req, res, next) => {
//   if (req.session && req.session.user && req.session.expires > Date.now()) {
//     // User is authenticated and has an unexpired session
//     next();
//   } else {
//     // Redirect to the login page or handle unauthorized access
//     res.redirect('/login');
//   }
// };

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Get all albums
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 */
router.get("/albums", async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json({ data: albums });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /albums/{id}:
 *   get:
 *     summary: Get an album
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 */
router.get("/albums/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.status(200).json({ data: album });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Post an Album
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 */
router.post("/albums", async (req, res) => {
  try {
    const { title, performer, cost } = req.body;
    const newAlbum = new Album({ title, performer, cost });
    const savedAlbum = await newAlbum.save();
    res.status(200).json({ data: savedAlbum });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /albums/{id}:
 *   put:
 *     summary: Edit an Album
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 */
router.put("/albums/:id", async (req, res) => {
  try {
    const { title, performer, cost } = req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      { title, performer, cost },
      { new: true }
    );
    if (!updatedAlbum) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.status(200).json({ data: updatedAlbum });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /albums:
 *   delete:
 *     summary: Delete an Album
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete("/albums/:id", async (req, res) => {
  try {
    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
    if (!deletedAlbum) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Post a purchase
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 */
router.post("/purchases", async (req, res) => {
  try {
    const { user, album } = req.body;
    const userInstance = await User.findById(user);
    const albumInstance = await Album.findById(album);
    if (!userInstance || !albumInstance) {
      return res.status(404).json({ error: "User or Album not found" });
    }
    const newPurchase = new Purchase({ user: userInstance, album: albumInstance });
    const savedPurchase = await newPurchase.save();
    res.status(200).json({ data: savedPurchase });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// applying checkAuth middleware on routes that require authentication.
// app.get('/dashboard', checkAuth, (req, res) => {
//   // If user is authenticated, render the dashboard
//   res.render('dashboard');
// });

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

// Swagger UI Express: This is an official tool to serve the Swagger UI and display API documentation generated by Swagger JSDoc.

// Swagger JSDoc: It allows you to write JSDoc comments in your API code, and it generates a Swagger definition that can be served
// using Swagger UI Express.

// router.post("/purchases", async (req, res) => {
//   try {
//     const { user, album } = req.body;
//     const newPurchase = new Purchase({ user, album });
//     const savedPurchase = await newPurchase.save();

//     // Use populate to include user and album data in the response
//     //await savedPurchase.populate("user album").execPopulate();
//     res.status(200).json({ data: savedPurchase });
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
