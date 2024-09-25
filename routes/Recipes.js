const { RecipeModel } = require("../models/recipeModel");
const { connectDB } = require("../connectToDB");

const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    await connectDB();
    const data = await RecipeModel.find();
    res.send({ data: data });
  } catch (error) {
    res.status(500).send("Error getting recipe");
  }
});

router.put("/recipe/update", async function (req, res) {
  console.log("we are in recipe update");
  const params = req.body.params;
  try {
    await connectDB();
    console.log("this is params", params);
    const category = await RecipeModel.findOneAndUpdate(
      { slug: params.slug },
      {
        ...params,
      }
    );

    category.save();

    res.send({
      message: `Edited recipe: ${params.slug}`,
    });
  } catch (error) {
    console.log("this is error", error);
    res.status(500).send("Error in update game");
  }
});

router.get("/recipe", async function (req, res) {
  try {
    await connectDB();
    console.log("this is req.query.slug", req.query.slug);
    const data = await RecipeModel.findOne({ slug: req.query.slug }).exec();
    res.send({ data: data });
  } catch (error) {
    res.status(500).send("Error getting specific recipe");
  }
});

router.post("/create", async function (req, res) {
  try {
    console.log("we are inside of create");
    const params = req.body.params;
    await connectDB();
    const newRecipe = new RecipeModel({
      ...params,
    });
    newRecipe.save();
    res.send({ data: "Sucessfully created new recipe" });
  } catch (error) {
    res.status(500).send("Error creating a new recipe");
  }
});

module.exports = router;
