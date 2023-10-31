import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Register from "./pages/home/Register/Register";
import Home from "./pages/home/Home";
import Login from "./pages/home/login/Login";
import Settings from "./pages/home/settings/Settings";
import Single from "./pages/home/single/Single";
import Infos from "./pages/home/Infos/Infos";

import Write from "./pages/home/write/Write";
import NotFound from "./pages/home/NotFound/NotFound";
import { useContext, useEffect, useState } from "react";
import Context from "./context/Context";
import myApi from "./service/service";

function App() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await myApi.fetchPosts();
      setPosts(res.data);
    } catch (error) {
      // console.error("erreur lors de la recup des posts :", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route
          path="/write"
          element={user ? <Write fetchPosts={fetchPosts} /> : <Register />}
        />
        <Route
          path="/settings"
          element={user ? <Settings fetchPosts={fetchPosts} /> : <Register />}
        />

        <Route path="/infos" element={user ? <Infos /> : <Register />} />
        <Route
          path="/post/:postId"
          element={<Single fetchPosts={fetchPosts} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
