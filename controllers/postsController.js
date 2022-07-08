const Post = require("../models/Post");

/* GET all Posts */
const getAllPosts = async (req, res) => {
    try {
        // might take some time because it's coming from a database
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
};

/* POST a new Post */
const createNewPost = async (req, res) => {
    // with async/await
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        // saving to DB, takes time, therefore await
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }

    // // with Promise (save() returns a Promise)
    // const post = new Post({
    //     title: req.body.title,
    //     description: req.body.description,
    // });

    // post.save()
    //     .then((data) => {
    //         res.status(200).json(data);
    //     })
    //     .catch((err) => {
    //         res.json({ message: err });
    //     });
};

/* GET a Post by ID */
const getPost = async (req, res) => {
    try {
        // might take some time because it's coming from a database
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
}

/* PATCH (update) a Post */
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            // syntax for updating a post, double object
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    date: Date.now(),
                },
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
}

/* DELETE a Post */
const deletePost = async (req, res) => {
    try {
        // collections.remove() has been deprecated, use either:
        // Post.deleteOne({ _id:req.params.postId })
        // OR
        // Post.findByIdAndDelete(req.params.postId)
        const removedPost = await Post.findByIdAndDelete(
            req.params.postId
        );
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = { getAllPosts, createNewPost, getPost, updatePost, deletePost };
