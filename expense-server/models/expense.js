// We interact with database by using models
// Using mongoose to write models
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const schema = mongoose.Schema(
  {
    // schema
    //fields entered in the expense card
    userid: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    categoryid: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    notes: {
      type: String,
      required: false,
      default: null
    },
    expense_date: {
      type: Date,
      required: true
    }
  },
  {
    // to include time stamps when we update something
    timestamps: true
  }
);

// mongoose exports a model method
module.exports = mongoose.model("Expense", schema);
