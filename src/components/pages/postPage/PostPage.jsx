import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import UsersContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";

const StyledPostCard = styled.div``;

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
   const [post, setPost] = useState("")
  const { setPosts, PostActionTypes } = useContext(PostsContext);
  const { loggedInUser } = useContext(UsersContext);

  useEffect(() => {
     fetch(`http://localhost:8888/posts/${id}`)
      .then((res) => res.json())
       .then((data) => {
        if (!data.title) {
          console.log(`cia yra ${{data}}`);
         }
         setPost(data);
         console.log(`cia nera ${{data}}`)
       });
   }, []);
  // pakeista post i data, nes su post negauna
  return (
     post && 
    (
      <StyledPostCard>
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        <div>
          <div>
            <p>{post.score}</p>
            <button></button>
            <button></button>
          </div>
          {loggedInUser.id === post.authorId ? (
            <div>
              {" "}
              <Link
                to={`/edit/${post.id}`}
                style={{
                  color: "unset",
                  textDecoration: "unset",
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

export default PostPage;
