import React, { Fragment, useState } from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./containers/LoginForm";
import RegisterForm from "./containers/RegisterForm";
import PostList from "./containers/PostList/PostList";
import CreatePostForm from "./containers/CreatePostForm";

const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState("");

  return (
    <Fragment>
      <Navbar
        isLoggedin={isLoggedIn}
        username={userData.username}
        loginHandler={setIsLoggedIn}
        editFlagHandler={setIsEditing}
      />
      <Route exact path="/">
        <PostList
          isAdmin={userData.role === "admin"}
          isEditing={isEditing}
          editFlagHandler={setIsEditing}
          postIdHandler={setPostId}
        />
      </Route>
      <Route exact path="/login">
        <LoginForm
          onLogin={setIsLoggedIn}
          loggedIn={isLoggedIn}
          userDataHandler={setUserData}
        />
      </Route>
      <Route exact path="/register">
        <RegisterForm />
      </Route>
      <Route exact path="/create">
        <CreatePostForm
          author={userData.username}
          isLoggedIn={isLoggedIn}
          isEditing={isEditing}
          postId={postId}
          editFlagHandler={setIsEditing}
        />
      </Route>
    </Fragment>
  );
};

export default App;
