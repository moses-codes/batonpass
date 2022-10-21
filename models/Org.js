const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    givenName: { type: String, unique: true },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    summary: { type: String, default: 'Summary goes here.' },
    bio: { type: String, default: 'No bio given.' },
    contact_givenName: { type: String, required: true },
    contact_surName: { type: String, required: true },
    contact_email: { type: String, unique: true },
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