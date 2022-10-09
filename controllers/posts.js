const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
module.exports = {
  
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, currUser: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" });
      const users = await User.find().sort({ createdAt: "desc" });
      res.render("feed2.ejs", { posts: posts, users: users, currUser: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      console.log(req.body, req.user)
      await Post.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

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
      res.redirect(`/feed`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
