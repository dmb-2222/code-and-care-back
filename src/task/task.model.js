const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTask = new Schema({
  start: { type: Number, required: true },
  duration: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const taskModel = mongoose.model("Task", userTask);

module.exports = taskModel;
