import styled from "styled-components";
import { useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import PostCard from "../../ui/post/PostCard";

const StyledFeed = styled.main`
display:flex;
flex-direction:column;
align-items: center;
margin: 50px 0 100px;
gap: 2rem;
div{
  width:500px;
}`;

const AllPosts = () => {
  const { posts } = useContext(PostsContext);
  return (
    
    <StyledFeed>
      {
      posts.map((post) => {
        return <PostCard key={post.id} data={post} />;
      })}
      {console.log(posts)}
    </StyledFeed>
    
  );
};

export default AllPosts;
