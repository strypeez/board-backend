const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const metaRoute = require("./routes/Meta.js");
const categoryRoute = require("./routes/Categories");
const orderRoute = require("./routes/Orders.js");
const gameRoute = require("./routes/Games.js");
const recipeRoute = require("./routes/Recipes.js");
const { connectDB } = require("./connectToDB.js");
const socketHandler = require("./socketHandler.js");
const { OrderWatcher } = require("./watchers/OrderWatcher.js");
const { GameWatcher } = require("./watchers/GameWatcher.js");
const { CategoryWatcher } = require("./watchers/CategoryWatcher.js");

app.use("/meta", metaRoute);
app.use("/categories", categoryRoute);
app.use("/orders", orderRoute);
app.use("/games", gameRoute);
app.use("/recipes", recipeRoute);

http.listen(PORT, async () => {
  try {
    await connectDB();
    socketHandler(socketIO);
    await OrderWatcher(socketIO);
    await GameWatcher(socketIO);
    await CategoryWatcher(socketIO);
    console.log(`Server listening on ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
