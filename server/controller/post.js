const Post = require("../models/Post")
const User = require("../models/User")
const cloudinary = require("cloudinary").v2
exports.createPost = async (req, res) => {
   try {
      const myCloud = await cloudinary.uploader.upload(req.body.image, {
         folder: "posts"
      });
      const newPostData = {
         caption: req.body.caption,
         image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
         },
         owner: req.user._id
      };
      const user = await User.findById(req.user._id);
      const newPost = await Post.create(newPostData)
      console.log("user", newPost);
      user.post.push(newPost._id);
      await user.save();
      res.status(201).json({
         success: true,
         post: newPost
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         mesage: error.message
      })
   }
}
exports.likeAndDisLikePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (!post) {
         return res.status(404).json({
            success: false,
            message: "Post not found"
         })
      }
      if (post.likes.includes(req.user._id)) {
         const index = post.likes.indexOf(req.user._id);
         post.likes.splice(index, 1);
         await post.save();
         return res.status(200).json({
            success: true,
            message: "Post Unliked"
         })
      }
      else {
         post.likes.push(req.user._id);
         await post.save();
         return res.status(200).json({
            success: true,
            message: "Post liked"
         })
      }

   } catch (error) {
      return res.status(404).json({
         success: false,
         message: error.message
      })
   }
}
exports.deletePost = async (req, res) => {
   try {
      console.log("hello");
      const post = await Post.findById(req.params.id);
      console.log(post);
      if (post.owner.toString() !== req.user._id.toString()) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized Request"
         })
      }
      await post.deleteOne();

      const user = await User.findById(req.user._id);
      const index = user.post.indexOf(req.params.id)
      user.post.splice(index, 1);

      await user.save()
      res.status(200).json({
         success: true,
         message: "Post Deleted"
      })
   } catch (error) {
      return res.status(400).json({
         success: false,
         message: error.message
      })
   }
}
exports.getFollowingPost = async (req, res) => {
   try {
      // const user = await User.findById(req.user._id).`populate("following","post");
      const user = await User.findById(req.user._id);
      const posts = await Post.find({
         owner: {
            $in: user.following
         }
      }).populate("owner likes comments.user")
      res.status(200).json({
         success: true,
         posts
      })
   } catch (error) {
      return res.status(400).json({
         success: false,
         message: error.message
      })
   }
}
exports.updatePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      const { caption } = req.body;
      if (post.owner.toString() !== req.user._id.toString()) {
         res.status(401).json({
            success: false,
            message: "Unauthorized Access"
         })
      }
      post.caption = caption;
      res.status(200).json({
         success: true,
         message: "Post Updated"
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}
exports.addComment = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      let commentExitsIndex = -1;
      post.comments.forEach((item, index) => {
         if (item.user.toString() === req.user._id.toString()) {
            commentExitsIndex = index;
         }
      })
      if (commentExitsIndex !== -1) {
         post.comments[commentExitsIndex].comment = req.body.comment;
         await post.save();
         return res.status(200).json({
            success: true,
            message: "Comment Updated"
         })
      }
      else {
         post.comments.push({
            user: req.user._id,
            comment: req.body.comment
         })
      }
      await post.save();
      res.status(200).json({
         success: true,
         message: "Post Commented"
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}
exports.deleteComment = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (!post) {
         return res.status(404).json({
            success: false,
            message: "Post not found"
         })
      }
      if (post.owner.toString() === req.user._id.toString()) {
         if (req.body.commentId == undefined) {
            return res.status(400).json({
               success: false,
               message: "Comment Id is required"
            })
         }
         post.comments.forEach((item, index) => {
            if (item._id.toString() === req.body.commentId.toString()) {
               return post.comments.splice(index, 1);
            }
         })
         await post.save();
         return res.status(200).json({
            success: true,
            message: "Selected Comment Deleted"
         })
      } else {
         post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
               return post.comments.splice(index, 1);
            }
         })
         await post.save();
         res.status(200).json({
            success: true,
            message: "Comment Deleted"
         })
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}