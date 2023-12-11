import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./contexts/UserContext";
import { PostsProvider } from "./contexts/PostContext";
import { CommentProvider } from "./contexts/CommentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CommentProvider>
    <PostsProvider>
      <UsersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UsersProvider>
    </PostsProvider>
  </CommentProvider>
);
