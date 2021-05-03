import React, { useState, useEffect, Fragment } from "react";
import BlogPost from "../../components/BlogPost/BlogPost";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import axios from "axios";

import classes from "./PostList.module.css";

const PostList = props => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/api/posts", { method: "GET" })
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      });
  }, [isDeleted]);

  const onPostEdit = id => {
    props.postIdHandler(id);
    props.editFlagHandler(true);
  };

  const onPostDelete = id => {
    axios
      .delete(`http://localhost:3001/api/posts/${id}`, {
        withCredentials: true,
      })
      .then(res => setIsDeleted(!isDeleted))
      .catch(err => console.log(err));
  };

  const postsKeys = Object.keys(posts);
  const postsRender = postsKeys
    .reverse()
    .map(id => (
      <BlogPost
        isAdmin={props.isAdmin}
        key={id}
        title={posts[id].title}
        postBody={posts[id].postBody}
        author={posts[id].author}
        id={id}
        onEditClick={onPostEdit}
        onDelClick={onPostDelete}
      />
    ));
  return (
    <Fragment>
      {props.isEditing ? <Redirect to="/create" /> : null}
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.PostList}>{postsRender}</div>
      )}
    </Fragment>
  );
};

export default PostList;
