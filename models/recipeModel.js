const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
    },
    image: {
      type: String,
    },
    ingredients: {
      type: [],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

const RecipeModel =
  mongoose.models.recipe || mongoose.model("recipe", recipeSchema);

module.exports = { RecipeModel };
