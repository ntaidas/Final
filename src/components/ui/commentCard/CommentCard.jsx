
import styled from "styled-components";

const StyledCommentCard = styled.div`
  height: 350px;
  width: 250px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 0 5px 5px;

  > h1 {
    text-align: center;
  }
  > img {
    height: 70%;
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

const CommentCard = ( {data} ) => {
  console.dir(data)
 
  return (
      <StyledCommentCard>
        <p>{data.content}</p>
      </StyledCommentCard>
  );
}
 
export default CommentCard;