const express = require("express");
const { register, login, followUser, updatePassword, updateProfile, logout, deleteMyProfile, myProfile, getUserProfile, getAllUser, forgotPassword, resetPassword, getMyPosts, getUserPosts, findUser, checkUsernameUnique } = require("../controller/user");
const {isAuthenticated} = require("../middleware/auth")

const router = express.Router();

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/follow/:id").get(isAuthenticated,followUser)

router.route("/update/password").put(isAuthenticated,updatePassword)

router.route("/update/profile").put(isAuthenticated,updateProfile)

router.route("/userprofile").get(isAuthenticated,myProfile)

router.route("/userprofile/:id").get(isAuthenticated,getUserProfile)

router.route("/getallusers").get(isAuthenticated,getAllUser)

router.route("/accounts/getmyposts").get(isAuthenticated,getMyPosts)

router.route("/accounts/getuserposts/:id").get(isAuthenticated,getUserPosts)

router.route("/forgot/reset/password").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/delete/userprofile").delete(isAuthenticated,deleteMyProfile)

router.route("/finduser").post(isAuthenticated,findUser)

router.route("/checkusername").get(isAuthenticated,checkUsernameUnique)

module.exports = router;
