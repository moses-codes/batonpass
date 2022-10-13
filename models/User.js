const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  givenName: { type: String, required: true },
  surName: { type: String, required: true },
  city: { type: String, required: true },
  loc_state: { type: String, required: true },
  summary: { type: Array, default: ["No specialities "] },
  bio: { type: String, default: 'No bio given.' },
  email: { type: String, unique: true },
  isOrg: { type: Boolean, default: false },
  orgName: { type: String, required: false },
  contactPending: { type: Array, default: [] },
  contactConfirm: { type: Array, default: [] },
  cloudinaryId: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: 'https://i.ibb.co/XWfQt5L/stacyinmanpic.jpg'
  },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
