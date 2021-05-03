import React, { Fragment } from "react";

import classes from "./Input.module.css";

const Input = props => {
  let inputElement = null;

  switch (props.inputElement) {
    case "input":
      inputElement = (
        <input
          key={props.inputKey}
          className={classes.Input}
          {...props.inputConfig}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          {...props.validation}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          key={props.inputKey}
          className={`${classes.Input} ${classes.Input__textarea}`}
          {...props.inputConfig}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          {...props.validation}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.Input + " " + classes.Input__select}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        >
          {props.inputConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default: {
      inputElement = null;
    }
  }

  return (
    <Fragment>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </Fragment>
  );
};

export default Input;
