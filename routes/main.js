const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const workoutController = require("../controllers/workouts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/favorites", ensureAuth, workoutController.getFavorites)
router.post("/saveFavorites", ensureAuth, workoutController.saveFavorites)
router.get("/form", ensureAuth, workoutController.getForm)
router.post("/form", ensureAuth, workoutController.createWorkout)
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
