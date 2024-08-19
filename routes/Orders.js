const { connectDB } = require("../connectToDB");
const { OrderModel } = require("../models/orderModel");
const { GameModel } = require("../models/gameModel");

const express = require("express");
const router = express.Router();

router.put("/order/:id", async function (req, res) {
  try {
    await connectDB();
    const data = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body.newOrder
    );
    res.send({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error updating order");
  }
});

router.put("/order/cancel/:id", async function (req, res) {
  const cart = req.body.cart;
  const newOrder = req.body.newOrder;
  try {
    const batchArr = [];
    cart.forEach((item) => {
      let upsertDoc = {
        updateOne: {
          filter: { _id: item.item },
          update: { quantity: item.oldQuantity + item.quantity },
          upsert: true,
        },
      };

      batchArr.push(upsertDoc);
    });
    await connectDB();
    await GameModel.bulkWrite(batchArr);
    const data = await OrderModel.findByIdAndUpdate(req.params.id, newOrder);
    res.send({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error cancelling order");
  }
});

router.get("/", async function (req, res) {
  try {
    await connectDB();
    const data = await OrderModel.find();
    res.send({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error getting orders from DB");
  }
});

router.post("/create", async function (req, res) {
  try {
    const batchArr = [];
    req.body.params.cart.forEach((item) => {
      let upsertDoc = {
        updateOne: {
          filter: { _id: item.item },
          update: { quantity: item.originalQuantity - item.quantity },
          upsert: true,
        },
      };

      batchArr.push(upsertDoc);
    });
    await connectDB();

    await GameModel.bulkWrite(batchArr);
    const newOrder = new OrderModel({
      cart: req.body.params.cart,
      state: req.body.params.state,
    });
    newOrder.save();
    res.send({
      message: "Succesfully created a new order",
    });
  } catch (error) {
    res.status(500).send("Error creating a new order");
  }
});

module.exports = router;
