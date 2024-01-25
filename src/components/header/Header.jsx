import React from "react";
import "./header.css";
import Samsup from "./../../assets/backgroundsamsuphi.mp4";

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <img />
      </div>
      <video autoPlay muted loop playsInline className="video-background">
        <source src={Samsup} type="video/mp4" />
        Votre navigateur ne prend pas en charge la balise vidéo.
      </video>
      <div className="headerImg"></div>
    </div>
  );
}

export default Header;
