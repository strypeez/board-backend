const mongoose = require("mongoose");

const metaSchema = new mongoose.Schema(
  {
    carousel: {
      type: [String],
    },
  },
  { timestamps: true }
);

const MetaModel = mongoose.models.meta || mongoose.model("meta", metaSchema);

module.exports = { MetaModel };
