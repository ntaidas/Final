import { createContext, useEffect, useReducer } from "react";

const CommentContext = createContext();
const CommentActionTypes = {
  getComments: "get all posts",
  newPost: "Write new post",
  deletePost: "delete the post",
  edit: "edit post",
};
const reducer = (state, action) => {
  switch (action.type) {
    case CommentActionTypes.getPosts:
      return action.data;
    case CommentActionTypes.newPost:
      fetch(`http://localhost:8888/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case CommentActionTypes.deletePost:
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
          return { id: action.id, authorId:action.authorId, edited:action.edited,score:action.score, answered: action.answered, ...action.data };
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
  const [comments, setcomments] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8888/comments`)
      .then((res) => res.json())
      .then((data) =>
      setcomments({
          type: CommentActionTypes.getPosts,
          data: data,
        })
      );
  }, []);

  return (
    <CommentContext.Provider value={{ comments, setcomments, CommentActionTypes }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider};
export default CommentContext;