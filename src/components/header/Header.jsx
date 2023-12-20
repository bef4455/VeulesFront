import React from "react";
import { motion } from "framer-motion";
import "./header.css";

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="header"
    >
      <div className="headerTitles">
        <motion.img
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        />
      </div>
      <div className="headerImg"></div>
    </motion.div>
  );
}

export default Header;
