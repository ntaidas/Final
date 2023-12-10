import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import Home from "./components/pages/home/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
