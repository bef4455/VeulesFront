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
          src="./../../../public/8701717939_31854594-6993-4558-9e1c-4c85f15114c0.png"
          alt="Logo Sam'Suphi"
          className="headerLogo"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        />
      </div>
      <div className="headerImg"></div>
    </motion.div>
  );
}

export default Header;
