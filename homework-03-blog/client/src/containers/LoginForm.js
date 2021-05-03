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
        type: "email",
        placeholder: "Email",
      },
      validation: {},
      onChange: setEmail,
      value: email,
    },
    password: {
      inputType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      validation: {},
      onChange: setPassword,
      value: password,
    },
  };

  const onFormSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!password || !email) {
      setIsDataValid(false);
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
        .catch(err => setIsDataValid(false));
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
