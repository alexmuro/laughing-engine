const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const favorites = require("../models/Favorites");
const workout = require("../models/workout");
const key = 'key'

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  // apiKey: process.env.key
  apiKey: key

});
const openai = new OpenAIApi(configuration);

module.exports = {
  getForm: async (req, res) => {
    try {
    
      const workouts = await workout.find()
      const fav = await favorites.find()
      res.render("form.ejs", { fav: fav, workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      const fav = await favorites.find()
      res.render("favorites.ejs", { fav: fav, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  saveFavorites: async (req, res) => {

    try {
      await favorites.create({
        favorite: req.body.name,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/favorites");
    } catch (err) {
      console.log(err);
    }
  },
  createWorkout: async (req, res) => {
    try {

      let weight = req.body.weight
      let feet = req.body.feet
      let inches = req.body.inches
      let focus = req.body.focus
      let days = req.body.days
      let level = req.body.level
      let goal = req.body.goal
      
      console.log(weight, feet, inches, focus, days, level, goal)
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create an exercise plan for a person who weighs ${weight} lbs, \nis ${feet} feet ${inches} inches tall,\nwants to focus on ${focus},\nworkout ${days} days a week, is a ${level}, and wants to ${goal}. how long will it take to reach my goal`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const parsableJSONresponse = response.data.choices[0].text.replace();
      const parsedResponse = JSON.stringify(parsableJSONresponse);

      // Use regular expression to match escaped new line characters
      let regex = /[\\n\"]/g;
      let regex2 = /^\./g
      // Replace all matches with an empty string
      let formattedResponse = parsedResponse.replace(regex, "")
      formattedResponse = formattedResponse.replace(regex2, "")

      console.log(formattedResponse)
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await workout.create({
        workout: result,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/form");
    } catch (err) {
      console.log(err);
    }
  },
  deleteFav: async (req, res) => {
    console.log('this is', req.params.favID)
    try {
      // Delete post from db
      await favorites.remove({ _id: req.params.favID })
      console.log("Deleted Favorite");
      res.redirect("/favorites");
    } catch (err) {
      res.redirect("/favorites");
    }
  },
};
