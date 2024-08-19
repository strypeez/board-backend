const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: [],
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

module.exports = { OrderModel };
