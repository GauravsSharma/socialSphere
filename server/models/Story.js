const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    caption:{
        type:String
    },
    images:[{
        url:String,
        public_id:String,
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    expiresAt:{
        type:Date,
        default:Date.now()+24*60*60*1000
    },
})
storySchema.index({expiresAt:1},{expireAfterSeconds:0});

module.exports = mongoose.model("Story", storySchema);