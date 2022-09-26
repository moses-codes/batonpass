const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const connectionsController = require("../controllers/connections");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

// router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/requestConnect/:friend/:user", connectionsController.requestConnect);
router.put("/confirmConnect/:friend/:user", connectionsController.confirmConnect);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
