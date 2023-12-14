import styled from "styled-components";
import { NavLink } from "react-router-dom";
import UsersContext from "../../../contexts/UserContext";
import { useContext } from "react";

const StyledMain = styled.main`
  display: flex;
  gap: 50px;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  .helloBox {
    display: flex;
    margin: 0;
    padding: 0;
    h3{
      display: flex;
      font-size: 2rem;
      align-items: flex-end;
      margin:0;
      margin-bottom: 0.8rem;
    }
    
  }
  .title {
      color: #af5d1a;
      margin: 0;
      font-size: 5rem;
      
    }
  .userName {
    color: #af5d1a;
    font-size: 5rem;
    text-transform: capitalize;
  }
  .callToAction{
    font-size: 2rem;
    a{
      text-decoration: none;
      color: #af5d1a;
      padding: 16px;
    }
    span{

    }
  }
`;

const Home = () => {
  const { loggedInUser } = useContext(UsersContext);
  return (
    <StyledMain>
      {!loggedInUser ? (
        <>
          <h1 className="title">Welcome to "Už Pašto"&trade;</h1>
          <div className="callToAction">
            <h2>Get your questions answered HERE and NOW! </h2>
            <p>
              Our top specialists will help you get all your questions answered!
            </p>
          </div>
          <p className="callToAction">
            <span>
              <NavLink to="/user/register">Sign Up</NavLink>
            </span>
            Now! if you still haven't or <br />
            <NavLink to="/user/login">Sign In</NavLink>{" "}
          </p>
        </>
      ) : (
        <>
          <div className="helloBox">
            <h3>Welcome back to</h3>
            <h1 className="title">"Už Pašto"&trade;</h1>
          </div>

          <h1 className="userName">{loggedInUser.userName}</h1>
        </>
      )}
    </StyledMain>
  );
};

export default Home;
