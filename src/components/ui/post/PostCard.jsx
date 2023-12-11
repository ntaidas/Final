import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import UsersContext from "../../../contexts/UserContext";

import { Link } from "react-router-dom";

const StyledPostCard = styled.div`
display: grid;
grid-template-rows: 3fr 1fr;
border: 1px solid red;
width: 80%;
`;

const PostCard = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setPosts, PostActionTypes } = useContext(PostsContext);
  const { loggedInUser } = useContext(UsersContext);

  return (
    data && (
      <StyledPostCard>
        <div className="content">
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
        <div className="functions">
          <div>
            <p>{data.score}</p>
            <button></button>
            <button></button>
          </div>
          {loggedInUser.id === data.authorId ? (
            <div>
              {" "}
              <Link
                to={`/edit/${data.id}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  setPosts({ type: PostActionTypes.deletePost, id: id });
                  navigate("/posts");
                }}
              >
                Delete
              </button>
            </div>
          ) : loggedInUser ? (
            <button>Reply</button>
          ) : null}
        </div>
      </StyledPostCard>
    )
  );
};

export default PostCard;
