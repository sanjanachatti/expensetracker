// We interact with database by using models
// Using mongoose to write models

const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// mongoose exports a model method
module.exports = mongoose.model("User", schema);
