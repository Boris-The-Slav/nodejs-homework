const router = require("express").Router();
const PostsController = require("../controllers/posts.controller");
const sessionValidator = require("../middleware/sessionValidator.const");
const roleValidator = require("../middleware/roleValidator.const");

const postsController = new PostsController();

sessionValidator, roleValidator("user");

//get all posts
router.get("/", (req, res) => {
  postsController.fetchAllPosts().then(data => res.send(data));
});

//get post by id
router.get("/:id", sessionValidator, roleValidator("user"), (req, res) => {
  postsController.fetchPostById(req.params.id).then(data => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).json({ message: "post not found" });
    }
  });
});

//add new post
router.post("/", sessionValidator, roleValidator("user"), (req, res) => {
  console.log(req.session);
  postsController
    .addNewPost({ ...req.body, author: req.session.username })
    .then(data => res.status(201).send(data))
    .catch(err => res.status(401).send(err));
});

//edit post
router.put("/:id", sessionValidator, roleValidator("admin"), (req, res) => {
  postsController
    .updatePost(req.params.id, { ...req.body, author: req.session.username })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401));
});

router.delete("/:id", sessionValidator, roleValidator("admin"), (req, res) => {
  postsController.deletePost(req.params.id).then(response => {
    console.log(response);
    res.status(200).send();
  });
});

module.exports = router;
