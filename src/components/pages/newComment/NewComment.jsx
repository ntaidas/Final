import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import InputHandler from "../../ui/inputs/InputHandler";
import PostsContext from "../../../contexts/PostContext";
import CommentContext from "../../../contexts/CommentContext";

const StyledNewComment = styled.main`
`;

const NewComment = (parentId) => {
  console.dir(parentId)
  const { comments, setcomments, CommentActionTypes } = useContext(CommentContext);
  const {posts} = useContext(PostsContext)
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
      const commentValues = {
        id: uuid(),
        score: 0,
        parentId:parentId,
        edited: false,
        ...values,
      };
      setcomments({
        type: CommentActionTypes.newComment,
        data: commentValues,
      });
      navigate("/posts")
    },
  });
  return (
    <StyledNewComment>
      <h1>reply to {posts.postId}</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputHandler type="text" name="title" formik={formik} />
        <InputHandler type="textarea" name="content" formik={formik} />    
        <button type="Submit">reply</button>
      </form>
    </StyledNewComment>
  );
};

export default NewComment;
