const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Album = require("../models/album");
const User = require("../models/user");

const purchaseSchema = new schema({
  user: User,
  album: Album
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // 'User' references the model name
  // album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" }  // 'Album' references the model name
}, { timestamps: true });

purchaseSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

purchaseSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
