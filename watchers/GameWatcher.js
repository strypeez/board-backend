const { GameModel } = require("../models/gameModel");

const GameWatcher = async (io) => {
  const changeStream = GameModel.watch([], { fullDocument: "updateLookup" });
  changeStream.on("change", (event) => {
    if (event.operationType === "insert") {
      const fullDocument = event.fullDocument;
      io.emit("NEW_GAME", fullDocument);
    } else if (event.operationType === "delete") {
      const fullDocument = event.fullDocument;
      io.emit("DELETE_GAME", fullDocument);
    }
  });
};

module.exports = { GameWatcher };
