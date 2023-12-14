import styled from "styled-components";

import { Link } from "react-router-dom";


const StyledPostCard = styled.div`
  grid-template-rows: 3fr 1fr;
  border: 1px solid red;
  width: 80%;
`;

const PostCard = ({ data }) => {
  
  return (
    data && (
      <>
        <StyledPostCard>
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
          <div className="functions">
            <div>
              <p>{data.score}</p>
              <button>Up</button>
              <button>Down</button>
              {data.edited && <p>edited</p>}
            </div>
           
          </div>
        </StyledPostCard>
      </>
    )
  );
};

export default PostCard;
