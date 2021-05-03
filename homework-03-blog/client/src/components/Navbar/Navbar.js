import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./Navbar.module.css";

const Navbar = props => {
  return (
    <nav className={classes.Navbar}>
      <Link
        className={classes.Navbar__heading}
        to="/"
        onClick={() => props.editFlagHandler(false)}
      >
        THE HOMEWORK BLOG
      </Link>
      <div>
        {props.isLoggedin ? (
          <Fragment>
            <p>Logged in: {props.username}</p>
            <Link to="/create" className={classes.Navbar__link}>
              Create Post
            </Link>
            <a
              href="/"
              className={classes.Navbar__link}
              onClick={e => {
                axios
                  .post("http://localhost:3001/api/auth/logout")
                  .then(res => props.loginHandler(false));
              }}
            >
              Logout
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/login" className={classes.Navbar__link}>
              Login
            </Link>
            <Link to="/register" className={classes.Navbar__link}>
              Register
            </Link>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
