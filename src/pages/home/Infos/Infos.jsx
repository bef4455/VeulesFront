import React from "react";
import "./infos.css";
import YouTube from "react-youtube";

function Infos() {
  const videoId = "RyPCme2BMx4";

  return (
    <div className="main-container">
      <div className="useful-addresses">
        <div className="address">
          <div className="addressIcon">&#128222;</div>
          <div className="addressInfo">
            <h2>Adresse 1</h2>
            <p>Description de l'adresse utile 1.</p>
          </div>
        </div>
        <div className="address">
          <div className="addressIcon">&#128221;</div>
          <div className="addressInfo">
            <h2>Adresse 2</h2>
            <p>Description de l'adresse utile 2.</p>
          </div>
        </div>
        {/* Ajoutez d'autres adresses utiles ici */}
      </div>
      <div className="video-container">
        <YouTube videoId={videoId} autoplay={true} />
      </div>
    </div>
  );
}

export default Infos;
