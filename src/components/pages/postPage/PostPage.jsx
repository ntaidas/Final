import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import UsersContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import CommentContext from "../../../contexts/CommentContext";
import PostCard from "../../ui/post/PostCard";
import CommentCard from "../../ui/commentCard/CommentCard";

const StyledPostCard = styled.div``;

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const { setPosts, PostActionTypes } = useContext(PostsContext);
  const { loggedInUser } = useContext(UsersContext);

  useEffect(() => {
    fetch(`http://localhost:8888/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8888/comments/`)
      .then((res) => res.json())
      .then((data) => {
        setComments({data});
        console.log(`cia komentarai${comments}`);
      });
  }, []);

  console.log(comments);
  const relevantComments = comments.filter(comment => comment.parentId === post.id)

  return (
    <>
      <PostCard data={post}></PostCard>
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
     
      {comments && relevantComments.map(comment => { <CommentCard data={comment}></CommentCard>})}
    </>
  );
};

export default PostPage;
