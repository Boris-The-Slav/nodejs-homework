import React from "react";

import classes from "./BlogPost.module.css";

const BlogPost = props => {
  return (
    <div className={classes.BlogPost}>
      <h3>{props.title}</h3>
      <p className={classes.BlogPost__body}>{props.postBody}</p>
      <p className={classes.BlogPost__author}>
        by: {props.author ? props.author : null}
      </p>
      {props.isAdmin ? (
        <div className={classes.BlogPost__buttonGroup}>
          <button
            className={classes.BlogPost__button}
            onClick={() => {
              props.onEditClick(props.id);
            }}
          >
            edit
          </button>
          <button
            className={classes.BlogPost__button}
            onClick={() => {
              props.onDelClick(props.id);
            }}
          >
            del
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default BlogPost;
