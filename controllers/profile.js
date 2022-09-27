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

    // likePost: async (req, res) => {
    //   try {
    //     await Post.findOneAndUpdate(
    //       { _id: req.params.id },
    //       {
    //         $inc: { likes: 1 },
    //       }
    //     );
    //     console.log("Likes +1");
    //     res.redirect(`/post/${req.params.id}`);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

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

};
