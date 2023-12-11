import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import UsersContext from "../../../contexts/UserContext";

const StyledPostCard = styled.div``;

const PostCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState("")
  const [ setPosts , PostActionTypes] = useContext(PostsContext);
  const { loggedInUser } = useContext(UsersContext);

  useEffect(() => {
    fetch(`http://localhost:8888/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (!data.name) {
          navigate("/");
        }
        setPost(data);
      });
  }, []);

  return (
    post && (
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
          {loggedInUser.id === post.authorId && (
            <div>
              {" "}
              <button onClick={() => navigate(`/posts/edit/${id}`)}>
                Edit
              </button>
              <button
                onClick={() => {
                  setPosts({ type: PostActionTypes.deletePost, id: id });
                  navigate("/posts");
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </StyledPostCard>
    )
  );
};

export default PostCard;
