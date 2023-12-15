import styled from "styled-components";
import { useContext } from "react";
import PostsContext from "../../../contexts/PostContext";
import PostCard from "../../ui/post/PostCard";

const StyledFeed = styled.main`
display:flex;
flex-direction:column;
align-items: center;
gap: 2rem;
div{
  width:300px;
}`;

const AnsweredPosts = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const answeredPosts = posts.filter((post) =>  post.anwered === true)
  return (
    
    <StyledFeed>
      { setPosts(answeredPosts.map((post) => {
        return <PostCard key={post.id} data={post} />;
      }))
      
      }
    </StyledFeed>
    
  );
};

export default AnsweredPosts;
