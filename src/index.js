import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./contexts/UserContext";
import { PostsProvider } from "./contexts/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PostsProvider>
    <UsersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersProvider>
  </PostsProvider>
);
