import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import UsersContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import CommentContext from "../../../contexts/CommentContext";
import PostCard from "../../ui/post/PostCard";

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
         }
         setPost(data);
       });
   }, []);
  // pakeista post i data, nes su post negauna
  return (
    <PostCard
    data={post}></PostCard>
  )
};

export default PostPage;
