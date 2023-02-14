// We interact with database by using models
// Using mongoose to write models
const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    //adding category name
    category_name: {
      type: String,
      required: true,
    },
    //adding category type which is either expense or income
    category_type: {
      type: String,
      required: true,
      default: "expense",
      enum: ["expense", "income"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", schema);
