const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    minPlayers: {
      type: Number,
    },
    maxPlayers: {
      type: Number,
    },
    playingTime: {
      type: Number,
    },
    yearPublished: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const GameModel = mongoose.models.game || mongoose.model("game", gameSchema);

module.exports = { GameModel };
