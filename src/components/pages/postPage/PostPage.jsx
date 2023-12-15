import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import UsersContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import CommentCard from "../../ui/commentCard/CommentCard";
import NewComment from "../newComment/NewComment";

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
    <main> 
      {post.edited ? <p>edited</p>: null}
      <div className="contentBox">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
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
              color: "unset",
              textDecoration: "unset",
            }}
          >
            Edit
          </Link>
        </div>
      ) : null}
      {loggedInUser ? <NewComment dataId={post.id} onCommentSubmit={handleNewComment}/> : null}
      {comments &&
        comments.map((comment) => {
          return <CommentCard data={comment} key={comment.id}></CommentCard>;
        })}
    </main>
  );
};

export default PostPage;
