const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { addStory, getMyStory, getMyFollowingStories } = require("../controller/story");
const router = express.Router();

router.route("/story/uploades").post(isAuthenticated,addStory)
router.route("/story/adminstory").get(isAuthenticated,getMyStory)
router.route("/story/followingstory").get(isAuthenticated,getMyFollowingStories)

module.exports = router;