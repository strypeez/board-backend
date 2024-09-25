const express = require("express");
const router = express.Router();

const { GameModel } = require("../models/gameModel");
const { CategoryModel } = require("../models/categoryModel");

const { connectDB } = require("../connectToDB");

router.delete("/game/delete/:id", async function (req, res) {
  try {
    throw new Error("error");
    await connectDB();
    const res1 = await CategoryModel.updateMany(
      {},
      {
        $pull: {
          items: req.params.id,
        },
      }
    );
    const res2 = await GameModel.deleteOne({ _id: req.params.id });
    res.send({
      message: `Successfully deleted game with id: ${req.params.id}`,
    });
  } catch (error) {
    res.status(500).send("Error in deleting a game");
  }
});

router.get("/", async function (req, res) {
  try {
    await connectDB();
    const data = await GameModel.find();

    res.send({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error in getting games");
  }
});

router.get("/game/:id", async function (req, res) {
  try {
    await connectDB();
    const data = await GameModel.findById(req.params.id);
    res.send({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error getting single game by ID");
  }
});

router.put("/game/update/:id", async function (req, res) {
  const params = req.body.params;
  try {
    await connectDB();
    const category = await GameModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: params.title,
        description: params.description,
        image: params.image,
        thumbnail: params.thumbnail,
        minPlayers: params.minPlayers,
        maxPlayers: params.maxPlayers,
        playingTime: params.playingTime,
        yearPublished: params.yearPublished,
        price: params.price,
        quantity: params.quantity,
      }
    );

    category.save();

    res.send({
      message: `Edited game: ${req.params.id}`,
    });
  } catch (error) {
    res.status(500).send("Error in update game");
  }
});

router.post("/list", async function (req, res) {
  try {
    await connectDB();
    const data = await GameModel.find({ _id: req.body.items });
    res.send({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error getting a list of games");
  }
});

router.post("/create", async function (req, res) {
  try {
    await connectDB();
    const newGame = new GameModel({
      title: params.title,
      description: params.description,
      image: params.image,
      thumbnail: params.thumbnail,
      minPlayers: params.minPlayers,
      maxPlayers: params.maxPlayers,
      playingTime: params.playingTime,
      yearPublished: params.yearPublished,
      price: params.price,
      quantity: params.quantity,
    });
    newGame.save();
    res.send({
      message: "Successfully create game",
    });
  } catch (error) {
    res.status(500).send("Error creating a game");
  }
});

module.exports = router;
