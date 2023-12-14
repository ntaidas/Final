import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import InputHandler from "../../ui/inputs/InputHandler";
import CommentContext from "../../../contexts/CommentContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StyledEditComment = styled.div``;

const EditComment = () => {
  const { setComments, CommentActionTypes } = useContext(CommentContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentValues, setCommentValues] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8888/comments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !('content' in data)) {
          navigate("/");
        } else {
          setCommentValues({
            content: data.content,
            edited: data.edited,
            ...data,
          });
        }
      });
  }, []);

  const validationRules = Yup.object({
    content: Yup.string()
      .min(1, "Can't be shorter than 4 characters")
      .max(140, "Maximum allowed length is 140 characters ")
      .required("Can't be empty")
      .trim(),
  });

  return (
    <StyledEditComment>
      <h1>Edit Comment</h1>
      {commentValues && (
        <Formik
          initialValues={commentValues}
          validationSchema={validationRules}
          onSubmit={(values) => {
            const editedValues = {
              ...values,
              edited: true
            };

            setComments({
              type: CommentActionTypes.editComment,
              id: id,
              data: editedValues
            });

            navigate(`/posts/${id}`);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <InputHandler type="textarea" name="content" formik={formik} />
              <button type="submit">Edit Comment</button>
            </form>
          )}
        </Formik>
      )}
    </StyledEditComment>
  );
};

export default EditComment;
