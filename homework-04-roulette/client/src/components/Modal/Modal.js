import React, { Fragment } from "react";

import classes from "./Modal.module.css";

const Modal = props => {
  return (
    <Fragment>
      {props.show ? (
        <div
          onClick={e => {
            if (e.target.classList[0].startsWith("Modal_Modal__outer")) {
              console.log("in the outer click handler");
              props.onShow(false);
            }
          }}
          className={classes.Modal__outer + " " + props.show}
          style={props.modalStyle}
        >
          <div className={classes.Modal__inner}>
            {props.allowClosing ? (
              <button className={classes.Modal__button}>X</button>
            ) : null}

            {props.children}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Modal;
