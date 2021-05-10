import React, { Fragment, useState } from "react";
import { Route, Link } from "react-router-dom";
import "./main.css";

import LoginForm from "./containers/LoginForm/LoginForm";
import RegisterForm from "./containers/RegisterForm/RegisterForm";
import GamePage from "./containers/GamePage/GamePage";

const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <Fragment>
      <Link to="/">
        <h1>ROULETTE TABLE</h1>
      </Link>

      <Route exact path="/">
        <GamePage
          userData={userData}
          isLoggedIn={isLoggedIn}
          onLogout={setIsLoggedIn}
        />
      </Route>
      <Route exact path="/login">
        <LoginForm
          isLoggedIn={isLoggedIn}
          onLogin={setIsLoggedIn}
          getUserData={setUserData}
        />
      </Route>
      <Route exact path="/register">
        <RegisterForm />
      </Route>
      <small className="author">Developed by Borisovski Borche</small>
      <small className="github">
        Source code :{" "}
        <a href="https://github.com/Boris-The-Slav/nodejs-homework">github</a>
      </small>
    </Fragment>
  );
};
export default App;
