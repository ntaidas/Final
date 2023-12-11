import { createContext, useEffect, useReducer } from "react";

const PostsContext = createContext();
const PostActionTypes = {
  getPosts: "get all posts",
  newPost: "Write new post",
  deletePost: "delete the post",
  edit: "edit post",
};
const reducer = (state, action) => {
  switch (action.type) {
    case PostActionTypes.getPosts:
      return action.data;
    case PostActionTypes.newPost:
      fetch(`http://localhost:8888/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case PostActionTypes.deletePost:
      fetch(`http://localhost:8888/posts/${action.id}`, {
        method: "DELETE",
      });
      return state.filter((el) => el.id.toString() !== action.id.toString());
    case PostActionTypes.edit:
      fetch(`http://localhost:8888/posts/${action.id}`, {
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

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8888/posts`)
      .then((res) => res.json())
      .then((data) =>
        setPosts({
          type: PostActionTypes.getPosts,
          data: data,
        })
      );
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts, PostActionTypes }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider};
export default PostsContext;