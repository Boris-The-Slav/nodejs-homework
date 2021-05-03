import React, { useState, useEffect, Fragment } from "react";
import Form from "../components/Form/Form";
import { Redirect } from "react-router-dom";
import axios from "axios";

const CreatePostForm = props => {
  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isDataValid, setIsDataValid] = useState(true);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.isEditing) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/api/posts/${props.postId}`, {
          withCredentials: true,
        })
        .then(res => {
          setTitle(res.data.title);
          setPostBody(res.data.postBody);
          setLoading(false);
        });
    }
  }, [props.isEditing, props.postId]);

  const formConfig = {
    title: {
      inputType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Post Title",
      },
      validation: {
        required: true,
      },
      onChange: setTitle,
      value: title,
    },
    postBody: {
      inputType: "textarea",
      elementConfig: {
        placeholder: "Enter post content...",
        cols: 30,
        rows: 10,
      },
      validaton: {
        required: true,
      },
      onChange: setPostBody,
      value: postBody,
    },
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (!title || !postBody) {
      setIsDataValid(false);
    } else {
      if (props.isEditing) {
        axios
          .put(
            `http://localhost:3001/api/posts/${props.postId}`,
            { title, postBody },
            { withCredentials: true }
          )
          .then(res => {
            props.editFlagHandler(false);
            setIsPostCreated(true);
          })
          .catch(err => console.log(err));
      } else {
        axios
          .post(
            "http://localhost:3001/api/posts",
            { title, postBody },
            { withCredentials: true }
          )
          .then(res => setIsPostCreated(true))
          .catch(err => console.log(err));
      }
    }
  };
  return (
    <Fragment>
      {!props.isLoggedIn ? <Redirect to="/login" /> : null}
      {isPostCreated ? <Redirect to="/" /> : null}
      <Form
        style={{ width: "800px" }}
        formTitl="Create Post"
        formConfig={formConfig}
        onSubmitHandler={onFormSubmit}
        buttonText={props.isEditing ? "Update" : "Create"}
        isDataValid={isDataValid}
        errorText="Please fill out all fields"
        loading={loading}
      />
    </Fragment>
  );
};

export default CreatePostForm;
