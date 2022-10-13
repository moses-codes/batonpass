const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
const flash = require("../node_modules/connect-flash");

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
            let summaryArr = []
            //throw error if input over 50char
            for (let i = 0; i < 5; i++){
                let formItem = req.body[`summary${i}`].trim()
                if (formItem.length > 50){
                    continue;
                };
                summaryArr.push(req.body[`summary${i}`].trim())
            }
            // arr = arr.filter(el => el !== '')
            console.log(summaryArr)
            await User.findOneAndUpdate(
                { _id: req.params.user },
                {
                    $set: { summary: summaryArr },
                }
            );
            req.flash("error", { msg: "oopsy." })
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    },
    changeInfo: async (req, res) => {
        let isOrgStatus = req.body.isOrg === 'on' ? true : false
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.user },
                {
                    $set: {
                        orgName: req.body.orgName,
                        givenName: req.body.givenName,
                        surName: req.body.surName,
                        city: req.body.city,
                        loc_state: req.body.loc_state,
                        email: req.body.email, 
                        isOrg: isOrgStatus,
                    },
                }
            );
            console.log(req.body, user);
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    },

    uploadProfilePic: async (req, res) => {
        
    //TODO:  FIGURE OUT UPLOAD
    
        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            await User.findOneAndUpdate(
                { _id: req.params.user },
                {
                    $set: {
                        image: result.secure_url,
                        cloudinaryId: result.public_id,
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
