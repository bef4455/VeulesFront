import React from "react";
import { motion } from "framer-motion";
import "./single.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Singlepost from "../../../components/singlePost/SinglePost";

const Single = ({ fetchPosts }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="single"
    >
      <Singlepost fetchPosts={fetchPosts} />
      <Sidebar />
    </motion.div>
  );
};

export default Single;
