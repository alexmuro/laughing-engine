const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  favID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Favorites",
  },
  favorite: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("favorites", FavoriteSchema);
