import React, { useState, Fragment } from "react";
import Form from "../components/Form/Form";
import axios from "axios";
import { Redirect } from "react-router-dom";

const LoginForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDataValid, setIsDataValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputConfig = {
    email: {
      inputType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email",
      },
      onChange: setEmail,
      value: email,
    },
    password: {
      inputType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      onChange: setPassword,
      value: password,
    },
  };

  const onFormSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!password || !email) {
      setIsDataValid(false);
      setLoading(false);
    } else {
      axios
        .post(
          "http://localhost:3001/api/auth/login",
          { email, password },
          { withCredentials: true }
        )
        .then(res => {
          setLoading(false);
          props.userDataHandler({
            username: res.data.username,
            role: res.data.role,
          });
          props.onLogin(true);
        })
        .catch(err => {
          console.log("in the error handler");
          setIsDataValid(false);
          setLoading(false);
        });
    }
  };

  return (
    <Fragment>
      {props.loggedIn ? <Redirect to="/" /> : null}
      <Form
        formTitle="Login"
        formConfig={inputConfig}
        onSubmitHandler={onFormSubmit}
        buttonText="Login"
        isDataValid={isDataValid}
        errorText="Invalid Credentials"
        loading={loading}
      />
    </Fragment>
  );
};

export default LoginForm;
