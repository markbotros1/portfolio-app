import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import NMT from "./pages/NMT";
import ICA from "./pages/ICA";
import Background from "./assets/background.jpg";
import "./styles/App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/projects" Component={Projects}></Route>
        <Route path="/nmt" Component={NMT}></Route>
        <Route path="/ica" Component={ICA}></Route>
      </Routes>

      <div className="bg">
        <img src={Background} alt="" />
      </div>
    </>
  );
};

export default App;
