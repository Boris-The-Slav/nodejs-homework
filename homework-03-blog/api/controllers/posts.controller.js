const PostsModel = require("../models/posts.model");
const postsModel = new PostsModel();

class PostsController {
  fetchAllPosts() {
    return postsModel.getPosts();
  }
  fetchPostById(id) {
    return postsModel.getPostByID(id);
  }
  addNewPost(post) {
    return postsModel.addNewPost(post);
  }
  updatePost(id, post) {
    return postsModel.updatePostById(id, post);
  }
  deletePost(id) {
    return postsModel.deletePostById(id);
  }
}

module.exports = PostsController;
