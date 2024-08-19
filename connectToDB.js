const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    return true;
  } catch (error) {
    console.log("we are in the connectToDB error");
    console.log(error);
  }
};

module.exports = { connectDB };
