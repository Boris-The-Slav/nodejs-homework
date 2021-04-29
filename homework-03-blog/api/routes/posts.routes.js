const router = require("express").Router();
const PostsController = require("../controllers/posts.controller");
const sessionValidator = require("../middleware/sessionValidator.const");
const roleValidator = require("../middleware/roleValidator.const");

const postsController = new PostsController();

//get all posts
router.get("/", sessionValidator, roleValidator("user"), (req, res) => {
  postsController.fetchAllPosts().then(data => res.send(data));
});

//add new post
router.post("/", sessionValidator, roleValidator("user"), (req, res) => {
  postsController
    .addNewPost(req.body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(401).send(err));
});

//edit post
router.put("/:id", sessionValidator, roleValidator("admin"), (req, res) => {
  postsController
    .updatePost(req.params.id, req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401));
});

router.delete("/:id", sessionValidator, roleValidator("admin"), (req, res) => {
  postsController.deletePost(req.params.id).then(_ => {
    res.status(200).send();
  });
});

module.exports = router;
