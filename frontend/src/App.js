import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "./scss/custom-bootstrap.scss";
import Home from "./screens/Home";
import Header from "./components/Header";
import Registration from "./screens/Registration";
import Login from "./screens/Login";
import CreatePost from "./screens/CreatePost";
import UserPosts from "./screens/UserPosts";
import Analytics from "./screens/Analytics";
import PostAnalytics from "./screens/PostAnalytics";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<UserPosts />} />
          <Route path='my-posts/analytics/:id' element={<PostAnalytics/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
