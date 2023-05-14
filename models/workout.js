const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  workoutID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Favorites",
  },
  workout: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("workout", WorkoutSchema);
