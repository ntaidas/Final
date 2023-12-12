import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import InputHandler from "../../ui/inputs/InputHandler";
import PostsContext from "../../../contexts/PostContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StyledEditPost = styled.div``;

const EditPost = () => {
  const { setPosts, PostActionTypes } = useContext(PostsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [postValues, setPostValues] = useState("");

  useEffect(() => {
    fetch(` http://localhost:8888/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.title) {
          navigate("/");
        }
        setPostValues({
          title: data.title,
          content: data.content,
          edited: data.edited,
          ...data,
        });
      });
  }, []);

  const validationRules = Yup.object({
    title: Yup.string()
      .min(4, "Can't be shorter than 4 characters")
      .max(30, "Maximum allowed length is 40 characters ")
      .required("Can't be empty")
      .trim(),
    content: Yup.string()
      .min(4, "Can't be shorter than 4 characters")
      .max(140, "Maximum allowed length is 140 characters ")
      .required("Can't be empty")
      .trim(),
  });
  return (<StyledEditPost>
    <h1>Edit Post</h1>
    {postValues && (
        <Formik
            initialValues={postValues}
            validationSchema={validationRules}
            onSubmit={(values) => {
                console.log(values)
                const editedValues = {
                    ...values,
                    edited: true
                }
                setPosts({
                    type:PostActionTypes.edit,
                    id:id,
                    data:editedValues
                })
                navigate(`/posts/${id}`)
            }}>
                {(formik)=> (
                    <form onSubmit={formik.handleSubmit}>
                        <InputHandler type="text" name="title" formik={formik}/>
                        <InputHandler type="textarea" name="content" formik={formik}/>
                        <button type="Submit">Edit</button>
                    </form>
                )}
            </Formik>
    )}
  </StyledEditPost>);
};

export default EditPost;
