const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
module.exports = {

    requestConnect: async (req, res) => {
        const targetUser = await User.findById(req.params.friend)
        try {
            if (
                targetUser.contactPending.indexOf(req.params.user) > -1 || targetUser.contactConfirm.indexOf(req.params.user) > -1
            ) {
                console.log('friend request already sent!')
            } else {
                await targetUser.updateOne(
                    {
                        $push: { contactPending: [req.params.user] }
                    }
                )
                console.log(req.params.user, req.params.friend, targetUser);
            }
            res.redirect(`/feed`);
        } catch (err) {
            console.log(err);
        }
    },

    confirmConnect: async (req, res) => {
        try {
            const targetUserID = req.params.friend
            const targetUser = await User.find({ _id: targetUserID })
            const currUser = await User.find({ _id: req.params.user })

            await User.findOneAndUpdate(
                {
                    _id: targetUserID,
                },
                {
                    $push: { contactConfirm: req.params.user },
                },
            )

            await User.findOneAndUpdate(
                {
                    _id: req.params.user,
                },
                {
                    $pull: { contactPending: targetUserID },
                    $push: { contactConfirm: [targetUserID] },
                },
            )
            console.log("targetUserID taken from pending & pushed to confirm!")
            res.redirect(`/connections`);
        } catch (err) {
            console.log(err);
        }
    },
    
  getConnections: async (req, res) => {
    try {
    //   const posts = await Post.find().sort({ createdAt: "desc" });
      const users = await User.find().sort({ createdAt: "desc" });
      res.render("connections/connectionsList.ejs", {  users: users, currUser: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  showConnection: async (req, res) => {
    try {
    const posts = await Post.find().sort({ createdAt: "desc" });
      const connection = await User.findById(req.params.id)
      res.render("connections/connectionPage.ejs", {  connection: connection, currUser: req.user, posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

    // deletePost: async (req, res) => {
    //     try {
    //         // Find post by id
    //         let post = await Post.findById({ _id: req.params.id });
    //         // // Delete image from cloudinary
    //         // await cloudinary.uploader.destroy(post.cloudinaryId);
    //         // Delete post from db
    //         await Post.remove({ _id: req.params.id });
    //         console.log("Deleted Post");
    //         res.redirect("/profile");
    //     } catch (err) {
    //         res.redirect("/profile");
    //     }
    // },
};
