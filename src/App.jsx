import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import Home from "./components/pages/home/Home";
import LoginPage from "./components/pages/loginPage/LoginPage";
import RegisterPage from "./components/pages/registerPage/RegisterPage";
import NewPost from "./components/pages/newPost/NewPost";
import AllPosts from "./components/pages/allPosts/AllPosts";
import EditPost from "./components/pages/editPost/EditPost";
import PostPage from "./components/pages/postPage/PostPage";
import NewComment from "./components/pages/newComment/NewComment";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="posts/:id" element={<PostPage />} />
        <Route path="newPost" element={<NewPost />} />
        <Route path="edit/:id" element={<EditPost />} />
        <Route path="/user">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
