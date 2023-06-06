import { Outlet } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

const Home = ({ posts }) => {
  // console.log("Response du premier setPosts", posts);

  return (
    <>
      <Header />
      <div className="home">
        <Outlet />
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};
export default Home;
