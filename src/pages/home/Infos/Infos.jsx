// Infos.js
import React from "react";
import "./infos.css";
import YouTube from "react-youtube";
import { motion } from "framer-motion";

function Infos() {
  const videoId = "RyPCme2BMx4";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="main-container"
    >
      <div className="useful-addresses">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="address"
        >
          <div className="addressIcon">&#128222;</div>
          <div className="addressInfo">
            <h2>Adresse 1</h2>
            <p>Description de l'adresse utile 1.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="address"
        >
          <div className="addressIcon">&#128221;</div>
          <div className="addressInfo">
            <h2>Adresse 2</h2>
            <p>Description de l'adresse utile 2.</p>
          </div>
        </motion.div>
        {/* Ajoutez d'autres adresses utiles ici */}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="video-container"
      >
        <YouTube videoId={videoId} autoplay={true} />
      </motion.div>
    </motion.div>
  );
}

export default Infos;
