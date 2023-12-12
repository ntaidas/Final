import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import InputHandler from "../../ui/inputs/InputHandler";
import CommentContext from "../../../contexts/CommentContext";


const StyledNewComment = styled.main`
`;

const NewComment = ({dataId, title}) => {
  const { setComments, CommentActionTypes } = useContext(CommentContext);
  const { loggedInUser } = useContext(UserContext);
  const values = {
    content: "",
    parentId: dataId
    
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
        parentId: dataId,
        authorId: loggedInUser.id,
        edited: false,
        ...values,
      };
      setComments({
        type: CommentActionTypes.newComment,
        data: commentValues,
      });
      console.log(` cia yra formik${values}`)
    },
  });
  return (
    <StyledNewComment>
      <h1>reply to {title}</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputHandler type="textarea" name="content" formik={formik} />    
        <button type="Submit">reply</button>
      </form>
    </StyledNewComment>
  );
};

export default NewComment;
