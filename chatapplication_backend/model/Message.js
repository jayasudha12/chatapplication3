const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  sender: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  receiver: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  replyMsg: {},
  image: {
    type: String, // Assuming you store the image URL
  },
}, { timestamps: true });

module.exports = mongoose.model("Message", msgSchema);
