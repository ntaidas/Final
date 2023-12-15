import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../../contexts/UserContext";

const StyledHeader = styled.header`
  @-webkit-keyframes glow {
    from {
      color: white;
      box-shadow: 0 0 5px #fff, 0 0 10px #fff;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff,
        0 0 50px #af5d1a, 0 0 60px #c92e19, 0 0 70px #c92e19;
    }

    to {
      color: #fff;
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff;
      text-shadow: 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff, 0 0 50px #af5d1a,
        0 0 60px #af5d1a, 0 0 70px #c92e19, 0 0 80px #c92e19;
    }
  }
  img {
    height: 110px;
  }
  display: grid;
  grid-template-columns: 4fr 6fr;
  height: 200px;
  border: 5px solid #af5d1a;
  box-shadow: inset 0 0 10px 1px #af5d1a;
  .active {
    animation: glow 3s ease-in-out infinite alternate;
  }
  > .titleName {
    background-image: url(https://motionarray.imgix.net/preview-763087-r1QsBoFsAc-high_0008.jpg);
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a14e0a;
    text-shadow: 0 0 2px white;
    font-size: 40px;
  }
  > nav {
    display: grid;
    grid-template-columns: 5fr 1fr;
    background-image: url(https://motionarray.imgix.net/preview-763087-r1QsBoFsAc-high_0008.jpg);
    background-position: center;
    > ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      align-items: flex-end;
      padding: 0 10px 20px;
      margin: 0;
      > li {
        list-style: none;
        font-size: 2rem;
        a {
          text-decoration: none;
          border: 2px #af5d1a solid;
          box-shadow: 0px 0px 5px 2px #af5d1a, inset 0px 0px 5px 1px #af5d1a;
          border-radius: 5px;
          padding: 5px 25px;
          min-width: 200px;
          color: white;
        }
        a:hover {
          background-color: #af5d1a8b;
          color: white;
        }
      }
    }
    > .userPanel {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      > div {
        display: flex;
        justify-content: center;
      }
      > ul {
        display: flex;
        padding: 0;
        justify-content: space-evenly;
        list-style: none;
        gap: 1px;
        a {
          text-decoration: none;
          color: #af5d1a;
          box-shadow: 0px 0px 3px 2px #fff, inset 0px 0px 3px 1px #fff;
          padding: 8px 14px;
        }
        a:hover {
          background-color: #af5d1a;
          color: white;
        }
      }
    }
  }
`;

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div className="titleName">
        <h1>"Už Pašto"&trade;</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Popular
            </NavLink>
          </li>

          {loggedInUser ? (
            <>
              <li>
                <NavLink
                  to="/answeredPosts"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Anwered
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myPosts"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  My Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/newPost"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  New Post
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
        {!loggedInUser ? (
          <div className="userPanel">
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/14/49/user-148855_1280.png"
                alt="user avatar"
              />
            </div>
            <ul>
              <li>
                <NavLink
                  to="/user/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/register"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <img
              src={loggedInUser.profilePicture}
              alt={"profile picture of " + loggedInUser.userName}
            />
            <span>{loggedInUser.userName}</span>
            <button
              onClick={() => {
                setLoggedInUser("");
                navigate("/");
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </nav>
    </StyledHeader>
  );
};

export default Header;
