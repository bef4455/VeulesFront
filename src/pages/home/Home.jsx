// Home.js
import React from "react";
import { Outlet } from "react-router";
import { motion } from "framer-motion";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

const Home = ({ posts }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Header />
      <div className="home">
        <Outlet />
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
    </motion.div>
  );
};
export default Home;
