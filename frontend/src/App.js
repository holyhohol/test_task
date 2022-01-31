import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "./scss/custom-bootstrap.scss";
import Home from "./screens/Home";
import Header from "./components/Header";
import Registration from "./screens/Registration";
import Login from "./screens/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
