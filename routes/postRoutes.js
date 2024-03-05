const express = require('express')

const PostController = require("../controllers/postController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.route("/")
    .get(protect, PostController.getAllPosts)
    .post(protect, PostController.createPost)

router.route("/:id")
    .get(protect, PostController.getOnePost)
    .patch(protect, PostController.updatePost)
    .delete(protect, PostController.deletePost)

module.exports = router;
