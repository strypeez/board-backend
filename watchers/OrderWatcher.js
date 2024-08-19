const { OrderModel } = require("../models/orderModel");

const OrderWatcher = async (io) => {
  const changeStream = OrderModel.watch([], { fullDocument: "updateLookup" });
  changeStream.on("change", (event) => {
    if (event.operationType === "insert") {
      const fullDocument = event.fullDocument;
      io.emit("NEW_ORDER", fullDocument);
    }
  });
};

module.exports = { OrderWatcher };
