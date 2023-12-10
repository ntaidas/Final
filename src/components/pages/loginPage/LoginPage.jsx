import styled from "styled-components";
import InputHandler from "../../ui/inputs/InputHandler";
import { useFormik } from "formik";
import * as Yup from "yup";
import UsersContext from "../../../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledLogin = styled.main``;

const LoginPage = () => {
  const navigate = useNavigate();
  const { users, setLoggedInUser } = useContext(UsersContext);
  const [failedLogin, setFailedLogin] = useState(false);
  const inputValues = {
    name: "",
    password: "",
  };
  const validationRules = Yup.object({
    name: Yup.string()
      .min(4, "must be longer than 4 symbols")
      .required("Can't be")
      .trim(),
    password: Yup.string().required("Must be filled").trim(),
  });

  const formik = useFormik({
    initialValues: inputValues,
    validationSchema: validationRules,
    onSubmit: (values) => {
      const loggedInUser = users.find(
        (user) =>
          user.userName === values.name && user.password === values.password
      );
      if (loggedInUser) {
        setLoggedInUser(loggedInUser);
        navigate("/");
      } else {
        setFailedLogin(true);
      }
    },
  });

  return (
    <StyledLogin>
      <h1>Please Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputHandler type="text" name="name" formik={formik} />
        <InputHandler type="password" name="password" formik={formik} />
        <button type="submit">Sign In</button>
      </form>
      {failedLogin && <p>Username or password is incorrect!</p>}
    </StyledLogin>
  );
};

export default LoginPage;
