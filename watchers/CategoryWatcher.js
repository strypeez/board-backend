const { CategoryModel } = require("../models/categoryModel");

const CategoryWatcher = async (io) => {
  const changeStream = CategoryModel.watch([], {
    fullDocument: "updateLookup",
  });
  changeStream.on("change", (event) => {
    if (event.operationType === "insert") {
      const fullDocument = event.fullDocument;
      io.emit("NEW_CATEGORY", fullDocument);
    } else if (event.operationType === "delete") {
      const fullDocument = event.fullDocument;
      io.emit("DELETE_CATEGORY", fullDocument);
    }
  });
};

module.exports = { CategoryWatcher };
