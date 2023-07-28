const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({name: String});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
}, { timestamps: true });

userSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
});

const User = mongoose.model("User", userSchema);

module.exports = User;