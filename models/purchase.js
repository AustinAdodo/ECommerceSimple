const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Album = require("./album");
const User = require("./user");

const purchaseSchema = new schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
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
