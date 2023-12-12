import { createContext, useEffect, useReducer } from "react";

const CommentContext = createContext();
const CommentActionTypes = {
  getComments: "get all Comment",
  newComment: "Write new Comment",
  deleteComment: "delete the Comment",
  editComment: "edit Comment",
};
const reducer = (state, action) => {
  switch (action.type) {
    case CommentActionTypes.getComments:
      return action.data;
    case CommentActionTypes.newComment:
      fetch(`http://localhost:8888/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case CommentActionTypes.deleteComment:
      console.dir(action.id)
      fetch(`http://localhost:8888/comments/${action.id}`, {
        method: "DELETE",
      });
      return state.filter((el) => el.id.toString() !== action.id.toString());
    case CommentActionTypes.edit:
      fetch(`http://localhost:8888/comments/${action.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return state.map((el) => {
        if (el.id.toString() === action.id.toString()) {
          return { id: action.id, parentId:action.parentId, authorId:action.authorId, edited:action.edited,score:action.score,  ...action.data };
        } else {
          return el;
        }
      });
    default:
      console.log("error: no such action", action.type);
      return state;
  }
};

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8888/comments`)
      .then((res) => res.json())
      .then((data) =>
      setComments({
          type: CommentActionTypes.getComments,
          data: data,
        })
      );
  }, []);

  return (
    <CommentContext.Provider value={{ comments, setComments, CommentActionTypes }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider};
export default CommentContext;