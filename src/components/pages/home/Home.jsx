import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledMain = styled.main``;

const Home = () => {
  return (
    <StyledMain>
      <h1>Welcome to "Už Pašto"&trade;</h1>
      <h2>Get your questions answered HERE and NOW! </h2>
      <p>Our top specialists will help you get all your questions answered!</p>
      <p>
        <span>
          <NavLink to="/user/register">Sign Up</NavLink>
        </span>
        Now! if you still haven't or <br />
        <NavLink to="/user/login">Sign In</NavLink>
      </p>
    </StyledMain>
  );
};

export default Home;
