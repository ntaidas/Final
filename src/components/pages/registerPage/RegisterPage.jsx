import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UsersContext from "../../../contexts/UserContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputHandler from "../../ui/inputs/InputHandler";
import { v4 as uuid } from "uuid";

const StyledRegisterForm = styled.main``;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { users, setUsers, setLoggedInUser, UsersActionTypes } =
    useContext(UsersContext);
  const inputValues = {
    userName: "",
    email: "",
    password: "",
    passwordRepeat: "",
    age: "",
    profilePicture: "",
  };
  const [failedToRegister, setFailedToRegister] = useState({
    email: "",
    name: "",
  });

  const ValidationRules = Yup.object({
    userName: Yup.string()
      .min(5, "Can't be shorter than 5")
      .max(20, "Can't be longer than 20")
      .required()
      .trim(),
    email: Yup.string()
      .email("Must be valid email address")
      .required("Can't be empty")
      .trim(),
    password: Yup.string().required("Can't be empty").trim(),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required(),
    age: Yup.number().moreThan(16, "Comeback in a few years!").required(),
    profilePicture: Yup.string()
      .url("Must be a valid adress")
      .required()
      .trim(),
  });

  const formik = useFormik({
    initialValues: inputValues,
    validationSchema: ValidationRules,
    onSubmit: (values) => {
      if (users.find((user) => user.userName === values.userName)) {
        setFailedToRegister((prevState) => {
          return { ...prevState, name: "User already exists" };
        });
      } else {
        setFailedToRegister((prevState) => {
          return { ...prevState, name: "" };
        });
      }
      if (users.find((user) => user.email === values.email)) {
        setFailedToRegister((prevState) => {
          return { ...prevState, email: "email taken" };
        });
      } else {
        setFailedToRegister((prevState) => {
          return { ...prevState, email: "" };
        });
      }
      if(!users.find((user)=> user.userName === values.userName) && !users.find((user)=> user.email === values.email)){
        const newUser = {
            id: uuid(),
            userName: values.userName,
            email: values.email,
            password: values.password,
            profilePicture: values.profilePicture,
            age: values.age

        };
        setUsers({
            type: UsersActionTypes.register,
            data: newUser
        });
        setLoggedInUser(newUser)
        navigate("/")
      }
    },
  });

  return (
    <StyledRegisterForm>
      <h1>Sign Up Now!</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputHandler
          type="text"
          name="userName"
          formik={formik}
          placeholder="enter name"
        />
        <InputHandler
          type="email"
          name="email"
          formik={formik}
          placeholder="enter email"
        />
        <InputHandler
          type="password"
          name="password"
          formik={formik}
          placeholder="enter password"
        />
        <InputHandler
          type="password"
          name="passwordRepeat"
          formik={formik}
          placeholder="repeat password"
        />
        <InputHandler
          type="number"
          name="age"
          formik={formik}
          placeholder="enter age"
        />
        <InputHandler
          type="url"
          name="profilePicture"
          formik={formik}
          placeholder="enter profile URL"
        />
        <button type="submit">Register</button>
      </form>
      {failedToRegister.name && <p>{failedToRegister.name}</p>}
      {failedToRegister.email && <p>{failedToRegister.email}</p>}
    </StyledRegisterForm>
  );
};

export default RegisterPage;
