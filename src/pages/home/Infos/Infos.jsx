import React from "react";
import "./infos.css";
import YouTube from "react-youtube";

function Infos() {
  const videoId = "RyPCme2BMx4";

  return (
    <div className="video-container">
      <YouTube videoId={videoId} autoplay={true} />
    </div>
  );
}

export default Infos;
