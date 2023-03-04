const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    Elective: {
      type: String,
      default: null,
    },
    Seats: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Elective", schema);
