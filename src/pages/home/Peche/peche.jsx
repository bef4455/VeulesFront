import React from "react";
import "./peche.css";

function Peche() {
  return (
    <div>
      <header className="banner">
        <img
          src="https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_7079.jpeg"
          alt="Bannière de pêche"
        />
      </header>
      <h1 className="titre">
        Horaires des marées à Veules les Roses en Normandie
      </h1>
      <div className="maree-container">
        <iframe
          src="http://www.horaire-maree.fr/widget_complexe.php?port=Veules-les-Roses&allowed=true"
          width="260"
          height="260"
          frameborder="0"
          scrolling="no"
        >
          <a href="http://maree.info/" target="_top" rel="dofollow">
            Calendrier des marées - horaire, hauteur, coefficient de marée
          </a>
        </iframe>
      </div>
    </div>
  );
}

export default Peche;
