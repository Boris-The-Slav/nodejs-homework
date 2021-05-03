import React, { Fragment } from "react";
import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";

import classes from "./Form.module.css";

const Form = props => {
  const configArr = Object.keys(props.formConfig);

  const arrRender = configArr.map(key => {
    return (
      <Input
        label={props.formConfig[key].label}
        inputElement={props.formConfig[key].inputType}
        value={props.formConfig[key].value}
        inputConfig={props.formConfig[key].elementConfig}
        onChange={props.formConfig[key].onChange}
        validation={props.formConfig[key].validation}
        key={key}
      />
    );
  });
  return (
    <Fragment>
      <form
        className={classes.Form}
        style={props.style}
        onSubmit={props.onSubmitHandler}
      >
        <h2>{props.formTitle}</h2>
        {props.loading ? <Spinner /> : arrRender}
        {props.children}
        {!props.isDataValid ? (
          <strong style={{ color: "red" }}>{props.errorText}</strong>
        ) : null}
        <button className={classes.Form__button}>{props.buttonText}</button>
      </form>
    </Fragment>
  );
};

export default Form;
