import React, { useState, Fragment } from "react";
import Form from "../../components/Form/Form";
import auth from "../../api/auth";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginFrom = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const formConfig = {
    email: {
      inputType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email",
      },
      onChange: setEmail,
      value: email,
      label: "Enter Email",
    },
    password: {
      inputType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      onChange: setPassword,
      value: password,
      label: "Enter Password",
    },
  };

  const onFormSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!password || !email) {
      setIsDataValid(false);
      setLoading(false);
      setErrorText("Please enter email and password");
    } else {
      auth
        .post("/login", { email, password })
        .then(res => {
          setLoading(false);
          props.getUserData({
            username: res.data.username,
            balance: res.data.balance,
            id: res.data.id,
          });
          props.onLogin(true);
        })
        .catch(err => {
          setLoading(false);
          setErrorText(err.response.data.message);
        });
    }
  };

  return (
    <Fragment>
      {props.isLoggedIn && <Redirect to="/" />}
      <Form
        formTitle="Login to begin playing"
        formConfig={formConfig}
        onSubmitHandler={onFormSubmit}
        buttonText={"Login"}
        isDataValid={isDataValid}
        errorText={errorText}
        loading={loading}
      >
        <p>
          Dont have an account? Click{" "}
          <Link
            to="/register"
            style={{ color: "gold", fontWeight: "600", fontSize: "1.3rem" }}
          >
            HERE
          </Link>{" "}
          to signup
        </p>
      </Form>
    </Fragment>
  );
};

export default LoginFrom;
