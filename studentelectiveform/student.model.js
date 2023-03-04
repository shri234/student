const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    Name: {
      type: String,
      default: null,
    },
    RollNo: {
      type: String,
      default: null,
    },
    Elective: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", schema);
