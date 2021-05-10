import React, { useState, Fragment } from "react";
import Joi from "joi";
import game from "../../../api/game";

import Form from "../../../components/Form/Form";

const ChargeBalanceForm = props => {
  const [balance, setBalance] = useState("");

  const [isDataValid, setIsDataValid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const formConfig = {
    balance: {
      inputType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Min 1000",
      },
      onChange: setBalance,
      value: balance,
    },
  };

  const validateForm = balance => {
    const balanceSchema = Joi.object({
      balance: Joi.number().min(1000).required(),
    });

    return balanceSchema
      .messages({
        "number.min": "Minimum ammount to charge must be above 1000",
      })
      .validate(balance);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    console.log("in the goddamn form submit");
    const validatedBalance = validateForm({ balance: Number(balance) });
    console.log(validatedBalance);

    if (validatedBalance?.error) {
      setIsDataValid(false);
      setErrorText(validatedBalance?.error.details[0].message);
      return;
    }
    setLoading(true);
    setIsDataValid(true);

    game
      .patch(`/player/charge/${props.playerId}`, validatedBalance.value)
      .then(res => {
        setLoading(false);
        props.onShowModal(false);
        props.setStartingBalance(() => res.data.balance);
        props.setPlayerBalance(() => res.data.balance);
      });
  };

  return (
    <Fragment>
      <Form
        style={{ margin: "0" }}
        formTitle="Add Credits"
        formConfig={formConfig}
        onSubmitHandler={onFormSubmit}
        buttonText="ADD"
        isDataValid={isDataValid}
        errorText={errorText}
        loading={loading}
      />
    </Fragment>
  );
};

export default ChargeBalanceForm;
