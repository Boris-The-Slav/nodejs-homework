import axios from "axios";
import React, { useState, Fragment } from "react";
import Form from "../components/Form/Form";
import { Redirect } from "react-router-dom";
import Joi from "joi";

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
      onChange: setUsername,
      value: username,
    },
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
    confirmPassword: {
      inputType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm password",
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

  const validateForm = formInputs => {
    const userSchema = Joi.object({
      username: Joi.string().min(3).max(30).required().alphanum(),
      password: Joi.string().min(6).max(30).required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
      role: Joi.string().valid("user", "admin").required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
    });

    return userSchema
      .messages({
        "string.empty": "All fields required",
        "any.only": "Passwords must match",
        "string.email": "Email must be valid",
      })
      .validate(formInputs);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    const validatedInputs = validateForm({
      username,
      password,
      confirmPassword,
      email,
      role,
    });

    console.log(validatedInputs);

    if (validatedInputs?.error) {
      setIsDataValid(false);
      setErrorText(validatedInputs?.error.details[0].message);
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
