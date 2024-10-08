const mongoose = require("mongoose");
const feedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Feed", feedSchema);
