const Story = require("../models/Story")
const User = require("../models/User")
const cloudinary = require("cloudinary").v2

exports.addStory = async (req, res) => {
  try {
    const { image, caption } = req.body;
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: 'stories',
    });

    let story = await Story.findOne({ owner: req.user._id });

    if (story) {
      story.images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
      story.caption = caption;
    } else {
      story = await Story.create({
        owner: req.user._id,
        images: [{
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        }],
        caption: caption,
      });
    }

    await story.save();

    return res.status(201).json({
      success: true,
      message: "Story added",
      story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMyFollowingStories = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('following');
    const following = user.following;

    const stories = await Promise.all(
      following.map(async (followedUser) => {
        const story = await Story.findOne({ owner: followedUser._id }).populate("owner");
        return story;
      })
    );

    // Filter out null values in case some followed users don't have any stories
    const filteredStories = stories.filter((story) => story !== null);

    res.status(200).json({
      success: true,
      stories: filteredStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMyStory = async (req, res) => {
  try {
    const story = await Story.findOne({ owner: req.user._id }).populate("owner")
    res.status(200).json({
      success: true,
      story,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    })
  }

}