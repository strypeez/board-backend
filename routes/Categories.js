const { connectDB } = require("../connectToDB");

const express = require("express");
const router = express.Router();

const { CategoryModel } = require("../models/categoryModel");

router.delete("/category/:id", async function (req, res) {
  try {
    await connectDB();
    const data = await CategoryModel.deleteOne({ _id: req.params.id });
    res.send({
      message: `Successfully deleted category id: ${req.params.id}`,
    });
  } catch (error) {
    res.status(500).send("Error deleteing category");
  }
});

router.get("/", async function (req, res, next) {
  try {
    await connectDB();
    const data = await CategoryModel.find();
    res.send({
      code: 200,
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error getting categories from DB");
  }
});

router.get("/category/:id", async function (req, res) {
  try {
    await connectDB();
    const data = await CategoryModel.findById(req.params.id);
    res.send({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error inside of getting a single category");
  }
});

router.put("/category", async function (req, res) {
  try {
    await connectDB();
    const category = await CategoryModel.findOneAndUpdate(
      { _id: req.body.categoryId },
      {
        title: req.body.params.title,
        description: req.body.params.description,
        items: req.body.params.items,
      }
    );
    res.send({
      message: `Updated Category: ${req.body.categoryId}`,
    });
  } catch (error) {
    res.status(500).send("Error updating category");
  }
});

router.post("/create", async function (req, res) {
  try {
    await connectDB();
    const newCategory = new CategoryModel({
      title: req.body.params.title,
      description: req.body.params.description,
      items: req.body.params.items,
    });
    newCategory.save();
    res.send({
      message: `Created a new category with title: ${req.body.params.title}`,
    });
  } catch (error) {
    res.status(500).send("Error creating a new category");
  }
});

module.exports = router;
