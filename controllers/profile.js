const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ currUser: req.user.id });
            res.render("profile.ejs", { posts: posts, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    changeBio: async (req, res) => {
        try {
            await User.findOneAndUpdate(
                { _id: req.params.user },
                {
                    $set: { bio: req.body.bio },
                }
            );
            console.log(req.body);
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    },

    changeSummary: async (req, res) => {
        try {
            await User.findOneAndUpdate(
                { _id: req.params.user },
                {
                    $set: { summary: req.body.summary },
                }
            );
            console.log(req.body);
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    },
    changeInfo: async (req, res) => {
        try {
            await User.findOneAndUpdate(
                { _id: req.params.user },
                {
                    $set: {
                        orgName: req.body.orgName,
                        givenName: req.body.givenName,
                        surName: req.body.surName,
                        city: req.body.city,
                        loc_state: req.body.loc_state,
                        email: req.body.email, 
                    },
                }
            );
            console.log(req.body);
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    },

};
