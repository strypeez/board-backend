const { MetaModel } = require("../models/metaModel");
const { connectDB } = require("../connectToDB");

const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    await connectDB();
    const data = await MetaModel.findById("666b4528c8a20f84bc9655be");
    res.send({ data: data });
  } catch (error) {
    res.status(500).send("Error getting meta");
  }
});

router.put("/carousel", async function (req, res) {
  try {
    await connectDB();
    await MetaModel.findByIdAndUpdate("666b4528c8a20f84bc9655be", {
      carousel: req.body.newItems,
    });

    res.send({ messge: "Successfully updated carousel" });
  } catch (error) {
    res.status(500).send("Error updating carousel");
  }
});

router.post("/create", async function (req, res) {
  try {
    await connectDB();
    const newMeta = new MetaModel({
      carousel: [],
    });
    newMeta.save();
    res.send({ data: "Sucessfully created new meta" });
  } catch (error) {
    res.status(500).send("Error creating a new meta");
  }
});

module.exports = router;
