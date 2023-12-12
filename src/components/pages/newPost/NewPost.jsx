import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import InputHandler from "../../ui/inputs/InputHandler";
import PostsContext from "../../../contexts/PostContext";

const StyledNewPost = styled.main`
`;

const NewPost = () => {
  const { setPosts, PostActionTypes } = useContext(PostsContext);
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const values = {
    title: "",
    content: "",
  };
  const validationRules = Yup.object({
    title: Yup.string()
      .min(4, `Can't be shorter than 4`)
      .max(30, `Maximum 30 characters allowed`)
      .required("required")
      .trim(),
    content: Yup.string()
      .min(4, `Can't be shorter than 4`)
      .max(140, `Maximum of 140 characters is allowed`)
      .required("required")
      .trim(),
  });

  const formik = useFormik({
    initialValues: values,
    validationSchema: validationRules,
    onSubmit: (values) => {
      const postValues = {
        id: uuid(),
        authorId: loggedInUser.id,
        score: 0,
        edited: false,
        anwsered: false,
        ...values,
      };
      setPosts({
        type: PostActionTypes.newPost,
        data: postValues,
      });
      navigate("/posts")
    },
  });
  return (
    <StyledNewPost>
      <h1>New Post</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputHandler type="text" name="title" formik={formik} />
        <InputHandler type="textarea" name="content" formik={formik} />    
        <button type="Submit">Post</button>
      </form>
    </StyledNewPost>
  );
};

export default NewPost;
