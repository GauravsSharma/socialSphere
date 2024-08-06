const User = require("../models/User")
const Post = require("../models/Post");
const { sendEmail } = require("../middleware/sendEmail");
const crypto = require("crypto")
const cloudinary = require("cloudinary").v2
exports.register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "users"
        });
        let user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                success: false,
                message: "User already exists"
            })
        }
        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, options).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists"
            })
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Password does'nt match"
            })
        }
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);
        if (!userToFollow) {
            res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        if (loggedInUser.following.includes(userToFollow._id)) {
            const indexFollower = userToFollow.followers.indexOf(loggedInUser._id);
            userToFollow.followers.splice(indexFollower, 1);
            const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
            loggedInUser.following.splice(indexFollowing, 1);
            await userToFollow.save();
            await loggedInUser.save();
            res.status(200).json({
                success: true,
                message: "User unFollowed"
            })
        }
        else {
            userToFollow.followers.push(loggedInUser._id);
            loggedInUser.following.push(userToFollow._id);
            await userToFollow.save();
            await loggedInUser.save();
            res.status(200).json({
                success: true,
                message: "User Followed"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now())
        }).json({
            success: true,
            message: "Logged out"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.updatePassword = async (req, res) => {
    try {
        const user = User.findById(req.user._id).select("password");
        const { oldPassword, newPassword } = req.body;
        const isMatch = user.matchPassword(oldPassword);
        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect Old Password"
            })
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Changed"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, email, avatar } = req.body;
        if (name && name != user.name) {
            console.log("hello");
            
            user.name = name;
        }
        if (email && email != user.email) {
            user.email = email;
        }
        if (avatar) {
            const imgId = user.avatar.public_id;
            await cloudinary.uploader.destroy(imgId)
            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "users"
            });
            user.avatar.public_id = myCloud.public_id,
                user.avatar.url = myCloud.secure_url
        }
        await user.save();
        
        res.status(200).json({
            success: true,
            message: "Profile Updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.deleteMyProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        const posts = user.post;
        const followers = user.followers;
        const following = user.following;
        await user.deleteOne()

        //remove all the posts of the user
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(post[i]);
            await post.remove();
        }
        // remove users's followers' s following to user
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);
            const index = follower.following.indexOf(req.user._id);
            follower.following.splice(index, 1);
            await follower.save();
        }
        // remove users's following' s follower to user
        for (let i = 0; i < following.length; i++) {
            const follow = await User.findById(following[i]);
            const index = follow.followers.indexOf(req.user._id);
            follow.followers.splice(index, 1);
            await follow.save()
        }

        res.status(200).json({
            success: true,
            message: "Account Deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("post followers following");
        console.log(req.user._id, user._id);
        if (user._id.toString() !== req.user._id.toString()) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        console.log(user);

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("post followers following");

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = [];
        for (let i = 0; i < user.post.length; i++) {
            const post = await Post.findById(user.post[i]).populate("owner likes comments.user")
            posts.push(post)
        }
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const posts = [];
        for (let i = 0; i < user.post.length; i++) {
            const post = await Post.findById(user.post[i]).populate("owner likes comments.user")
            posts.push(post)
        }
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        const userId = req.user._id;
        const filteredUsers = users.filter(user => !user._id.equals(userId))
        console.log(filteredUsers);
        res.status(200).json({
            success: true,
            users:filteredUsers
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        const resetPasswordToken = user.getResetPasswordToken();
        await user.save();

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'; // Default to localhost if not set
        const resetUrl = `${clientUrl}/password/reset/${resetPasswordToken}`;
        const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });
            return res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        console.log(resetPasswordToken);
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token Invalid or Expired"
            })
        }
        user.password = req.body.password;
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Password Changed"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.findUser = async (req, res) => {
    try {
        const query = req.body.query;
        if (query) {
            const user = await User.findOne({ username: req.body.query })
            res.status(200).json({
                success: true,
                user
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Input query required"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}
exports.checkUsernameUnique = async (req, res) => {
    try {
        const username = req.body.username;
        if (username) {
            const user = await User.findOne({ username: username });
            if (user) {
                res.status(200).json({
                    success: true,
                    isUnique: false,
                    message: "Username is already taken"
                });
            } else {
                res.status(200).json({
                    success: true,
                    isUnique: true,
                    message: "Username is available"
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

