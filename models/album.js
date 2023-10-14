const mongoose = require("mongoose");
const schema = mongoose.Schema;

const albumSchema = new schema({
  performer: String,
  title: String,
  cost: Number
}, { timestamps: true, /*collection: 'custom_collection_name' */});

albumSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

albumSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
});

//const Album = mongoose.model("Album", albumSchema);
const Album = mongoose.model("Album", albumSchema,"Albums");

module.exports = Album;