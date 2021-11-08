const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    teste: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

