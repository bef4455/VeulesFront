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
      <h1 className="titre">Horaires des marées</h1>

      <div>
        <iframe
          src="http://www.horaire-maree.fr/maree/Veules-les-Roses/"
          width="100%;"
          height="900px;"
        ></iframe>
      </div>

      <div className="description">
        <p>
          La pêche à la grise, c’est grisant. <br /> La crevette n’est pas loin
          quand l’eau n’est pas trop glacée.
          <br /> Alors que les flots laissent place au sable, choisi ton
          pousseux et file au devant de la petite grise. <br /> Les pieds dans
          l’eau, le nez au vent, tes pensées rejoignent les cieux et l’esprit
          prend congé…
        </p>
      </div>
      <div className="Photo">
        <img src="./../../../" alt="Bannière de pêche" />
      </div>
    </div>
  );
}

export default Peche;
