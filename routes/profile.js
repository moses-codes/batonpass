const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//profile Routes - simplified for now

router.put("/changeBio/:user", profileController.changeBio);
router.put("/changeSummary/:user", profileController.changeSummary);

module.exports = router;
