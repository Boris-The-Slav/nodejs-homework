import React, { useState, Fragment } from "react";
import Form from "../../components/Form/Form";
import { Redirect } from "react-router-dom";
import Joi from "joi";
import auth from "../../api/auth";

const RegisterForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isDataValid, setIsDataValid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

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
    balance: {
      inputType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Min 1000",
      },
      onChange: setBalance,
      value: balance,
      label: "Enter starting balance",
    },
  };

  const validateForm = formInputs => {
    const userSchema = Joi.object({
      username: Joi.string().min(3).max(30).required().alphanum(),
      password: Joi.string().min(6).max(30).required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
      balance: Joi.number().min(1000).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
    });
    return userSchema
      .messages({
        "string.empty": "All fields required",
        "any.only": "Passwords must match",
        "string.email": "Email must be valid",
        "number.min":
          "You have to register with atleast 1000 starting balance.",
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
      balance: Number(balance),
    });

    console.log(validatedInputs);

    if (validatedInputs?.error) {
      setIsDataValid(false);
      setErrorText(validatedInputs?.error.details[0].message);
      return;
    }
    setLoading(true);
    setIsDataValid(true);

    auth
      .post("/register", {
        username,
        email,
        password,
        balance: Number(balance),
      })
      .then(res => {
        setLoading(false);
        setIsRegistered(true);
      })
      .catch(err => {
        setLoading(false);
        setIsDataValid(false);
        setErrorText(err.response.data.message);
      });
  };

  return (
    <Fragment>
      {isRegistered && <Redirect to="/login" />}
      <Form
        formTitle="Register"
        formConfig={formConfig}
        onSubmitHandler={onFormSubmit}
        buttonText="Register"
        isDataValid={isDataValid}
        errorText={errorText}
        loading={loading}
      />
    </Fragment>
  );
};

export default RegisterForm;
