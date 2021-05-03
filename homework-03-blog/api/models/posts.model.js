const fetch = require("node-fetch");
const DB_URL =
  "https://blog-roulette-hwork-default-rtdb.europe-west1.firebasedatabase.app/posts";

class PostsModel {
  getPosts = () => {
    return fetch(DB_URL + ".json", { method: "GET" }).then(res => res.json());
  };

  getPostByID = id => {
    return fetch(`${DB_URL}/${id}.json`, { method: "GET" }).then(res =>
      res.json()
    );
  };
  addNewPost = post => {
    return fetch(DB_URL + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(res => res.json());
  };
  updatePostById = (id, post) => {
    return fetch(`${DB_URL}/${id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(res => res.json());
  };
  deletePostById = id => {
    return fetch(`${DB_URL}/${id}.json`, {
      method: "DELETE",
    });
  };
}

module.exports = PostsModel;
