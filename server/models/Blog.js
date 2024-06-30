const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  excerpt:{
    type: String,
    required: true,
  },
  coverImage: {
    data: Buffer,
    contentType: String,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category:{
    type:String,
    required:true,
  },
  creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
