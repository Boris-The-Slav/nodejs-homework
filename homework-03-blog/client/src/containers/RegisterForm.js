import axios from "axios";
import React, { useState, Fragment } from "react";
import Form from "../components/Form/Form";
import { Redirect } from "react-router-dom";

const RegisterForm = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDataValid, setIsDataValid] = useState(true);
  const [role, setRole] = useState("user");
  const [errorText, setErrorText] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const formConfig = {
    username: {
      inputType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Username",
      },
      validation: {
        required: true,
      },
      onChange: setUsername,
      value: username,
    },
    email: {
      inputType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      validation: {
        required: true,
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
      validation: {
        required: true,
        minLength: 6,
      },
      onChange: setPassword,
      value: password,
    },
    confirmPassword: {
      inputType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm password",
      },
      validation: {
        required: true,
        minLength: 6,
      },
      onChange: setConfirmPassword,
      value: confirmPassword,
    },
    role: {
      inputType: "select",
      elementConfig: {
        options: [
          { value: "user", displayValue: "User" },
          { value: "admin", displayValue: "Admin" },
        ],
      },
      label: "Select role",
      value: role,
      onChange: setRole,
    },
  };

  const validateInputs = inputs => {
    return inputs.every(input => input);
  };
  const validatePassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const onFormSubmit = e => {
    const isValidInputs = validateInputs([
      username,
      password,
      confirmPassword,
      email,
      role,
    ]);
    const isValidPassword = validatePassword(password, confirmPassword);
    e.preventDefault();
    if (!isValidInputs) {
      setIsDataValid(false);
      setErrorText("All fields must be filled");
      return;
    }
    if (!isValidPassword) {
      setIsDataValid(false);
      setErrorText("Passwords must match");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:3001/api/auth/register", {
        username,
        email,
        password,
        role,
      })
      .then(res => {
        setLoading(false);
        setIsRegistered(true);
      })
      .catch(err => {
        setLoading(false);
        setErrorText(err);
      });
  };

  return (
    <Fragment>
      {isRegistered ? <Redirect to="/login" /> : null}
      <Form
        formTitle="Register"
        formConfig={formConfig}
        onSubmitHandler={onFormSubmit}
        buttonText="Signup"
        isDataValid={isDataValid}
        errorText={errorText}
        loading={loading}
      />
    </Fragment>
  );
};

export default RegisterForm;
