// Spinner.js
import React from "react";
import "./Spinner.css"; // Assurez-vous de spécifier le bon chemin vers le fichier CSS du spinner

const Spinner = () => {
  return (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
