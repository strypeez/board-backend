const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);

module.exports = { CategoryModel };
