// Routing, just like in Django with paths and includes
const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

/* home route, get all existing Posts and create new Post */
router
    .route("/")
    .get(postsController.getAllPosts)
    .post(postsController.createNewPost);

/* route with Post ID. Read, Update, and Delete existing Post */
router
    .route("/:postId")
    .get(postsController.getPost)
    .patch(postsController.updatePost)
    .delete(postsController.deletePost);

// DON'T FORGET TO EXPORT
module.exports = router;
