import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CommentContext from '../../../contexts/CommentContext';
import UsersContext from "../../../contexts/UserContext";
import EditComment from '../../pages/editComment/EditComment';


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

  > button {
    margin-top: 10px;
  }
`;

const CommentCard = ({ data }) => {
  const { setComments, CommentActionTypes } = useContext(CommentContext);
  const { loggedInUser } = useContext(UsersContext);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleDelete = () => {
    setComments({
      type: CommentActionTypes.deleteComment,
      id: data.id,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <StyledCommentCard>
      <p>{data.authorId}</p>
      {isEditing ? (
        <EditComment data={data} onCancelEdit={handleCancelEdit}  />
      ) : (
        <>
          <p>{data.content}</p>
          {loggedInUser.userName === data.authorId ? (
            <>
              <button onClick={handleEditClick} data={data}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : null}
          {data.edited? <p>edited</p>:null}
        </>
      )}
    </StyledCommentCard>
  );
};

export default CommentCard;
