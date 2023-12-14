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

const NewComment = ({ dataId, onCommentSubmit }) => {
  const { CommentActionTypes, setComments } = useContext(CommentContext);
  const { loggedInUser } = useContext(UserContext);

  const validationRules = Yup.object({
    content: Yup.string()
      .min(1, `Can't be shorter than 4`)
      .max(140, `Maximum of 140 characters is allowed`)
      .required("required")
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: validationRules,
    onSubmit: async (values) => {
      const commentValues = {
        id: uuid(),
        score: 0,
        postId: dataId,
        authorId: loggedInUser.userName,
        edited: false,
        ...values,
      };

      try {
        // Make the network request to post the new comment
        const response = await fetch("http://localhost:8888/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentValues),
        });

        if (!response.ok) {
          throw new Error("Failed to post comment");
        }

        // Assuming the server returns the newly created comment
        const newComment = await response.json();

        // Update the local state using onCommentSubmit
        onCommentSubmit(newComment);

        // Update the context state if needed
        setComments({
          type: CommentActionTypes.newComment,
          data: newComment,
        });
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    },
  });

  return (
    <StyledNewComment>
      <form onSubmit={formik.handleSubmit}>
        <InputHandler type="textarea" name="content" formik={formik} />
        <button type="submit">Reply</button>
      </form>
    </StyledNewComment>
  );
};


export default NewComment;
