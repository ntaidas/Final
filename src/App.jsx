import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import Home from "./components/pages/home/Home";
import LoginPage from "./components/pages/loginPage/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/user">
          <Route path="login" element={<LoginPage/>}/>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
