const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
