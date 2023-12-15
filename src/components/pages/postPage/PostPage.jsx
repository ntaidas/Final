import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import UsersContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import CommentCard from "../../ui/commentCard/CommentCard";
import NewComment from "../newComment/NewComment";
import styled from "styled-components";

const StyledPost = styled.main`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 20px;
  .contentBox {
    display: flex;
    flex-direction: column;
    border: 1px solid #af5d1a;
    padding: 30px;
    h1 {
      text-align: center;
    }
  }
  .authorOptions {
    display: flex;
    button {
      color: #af5d1a;
      border-style: none;
      background-color: #00000081;
      border-radius: 10px;
      box-shadow: none;
    }
  }
`;

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const { setPosts, PostActionTypes } = useContext(PostsContext);
  const { loggedInUser } = useContext(UsersContext);

  useEffect(() => {
    fetch(`http://localhost:8888/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, [id]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8888/comments/`);
        const data = await response.json();

        if (!data.title) {
          setComments(data.filter((comment) => comment.postId === post.id));
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <StyledPost>
      {comments &&
        comments.map((comment) => {
          return <CommentCard data={comment} key={comment.id}></CommentCard>;
        })}
      <div className="contentBox">
        {post.edited ? <p>edited</p> : null}
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        <div className="authorOptions">
          {loggedInUser.id === post.authorId ? (
            <button
              onClick={() => {
                setPosts({ type: PostActionTypes.deletePost, id: id });
                navigate("/posts");
              }}
            >
              Delete
            </button>
          ) : null}
          {loggedInUser.id === post.authorId ? (
            <div>
              <Link
                to={`/edit/${post.id}`}
                style={{
                  color: "#af5d1a",
                  textDecoration: "unset",
                  backgroundColor: "#00000081",
                  borderRadius: "10px",
                  display:"block",
                  width: "50px",
                  textAlign: "center"
                }}
              >
                Edit
              </Link>
            </div>
          ) : null}
        </div>
        {loggedInUser ? (
          <NewComment dataId={post.id} onCommentSubmit={handleNewComment} />
        ) : null}
      </div>
    </StyledPost>
  );
};

export default PostPage;
