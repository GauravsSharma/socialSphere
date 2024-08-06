const express = require("express");
const { createPost, likeAndDisLikePost, deletePost, getFollowingPost, addComment, deleteComment } = require("../controller/post");
const { isAuthenticated } = require("../middleware/auth");
const { logout } = require("../controller/user");
const router = express.Router();

router.route("/post/uploads").post(isAuthenticated,createPost)

router.route("/post/:id").get(isAuthenticated,likeAndDisLikePost).delete(isAuthenticated,deletePost)

router.route("/followingpost").get(isAuthenticated,getFollowingPost)

router.route("/post/comment/:id").put(isAuthenticated,addComment).delete(isAuthenticated,deleteComment)

module.exports = router;