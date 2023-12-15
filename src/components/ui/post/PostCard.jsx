import styled from "styled-components";

import { Link } from "react-router-dom";


const StyledPostCard = styled.div`
position: relative;
  grid-template-rows: 3fr 1fr;
  border: 1px solid #af5d1a;
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  h1{
    text-align: center;
  }
  .edited{
    position: absolute;
    padding: 0;
    margin:0;
    color: orange;
  }
  .functions{
    display: flex;
    gap: 10px;
    align-items: center;
    button{
      height: 30px;
    }
  }
`;

const PostCard = ({ data }) => {
  
  return (
    data && (
      <>
        <StyledPostCard>
        {data.edited && <p className="edited">edited</p>}
          <Link
            to={`/posts/${data.id}`}
            style={{
              color: "unset",
              textDecoration: "unset",
            }}
          >
            <div className="content">
              <h1>{data.title}</h1>
              <p>{data.content}</p>
            </div>
          </Link>
          <div >
            <div className="functions">
              <p>{data.score}</p>
              <button>Up</button>
              <button>Down</button>
              
            </div>
           
          </div>
        </StyledPostCard>
      </>
    )
  );
};

export default PostCard;
