const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const workoutController = require("../controllers/workouts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

// router.get("/favorites", ensureAuth, favController.getFavorites)

// router.post("/createPost", upload.single("file"), postsController.createPost);

// router.post("/comment", postsController.createComment);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteFav/:favID", workoutController.deleteFav);

module.exports = router;
