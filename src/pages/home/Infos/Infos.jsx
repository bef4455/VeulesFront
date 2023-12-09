import React from "react";
import { useState } from "react";
import "./infos.css";

const Infos = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(0);

  const recipes = [
    {
      title: "Cuisson des bulots",
      image: "/BULOTS-NATURE-scaled.jpg",
      ingredients: [
        "Des bulots par milliers (tant qu'à faire autant en avoir plein)",
        "1 Grande quantité d'eau",
        "Sel et poivre et thym",
      ],
      instructions: [
        "Faire dégorger les bulots pendant une bonne heure en les recouvrant d'eau très salée.",
        "Les rincer et les faire cuire, départ eau froide, durant 20 minutes avec sel, poivre, thym puis les laisser refroidir dans l’eau de cuisson.",
      ],
    },
    {
      title: "Cuisson du tourteau",
      image: "./cuisson-du-tourteau-0.jpg",
      ingredients: [
        "1 Tourteau",
        "1 Grande quantité d'eau",
        "Un filet de vinaigre",
        "Quelques aromates dont un bouquet garni (facultatif)",
        "Sel et Poivre",
      ],
      instructions: [
        "Dans une quantité d'eau suffisante, ajouter les éléments du court-bouillon et laisser chauffer jusqu'à ébullition.",
        "Plonger le tourteau pattes en bas et laisser cuire 10 minutes à frémissement.",
        "Arrêter la cuisson et couvrir pendant 10 minutes, puis enfin sortir le tourteau et le laisser refroidir à température ambiante.",
      ],
    },
    {
      title: "Cuisson de l'Araignée de mer",
      image: "/recette-araignee-de-mer-1024x680.jpg",
      ingredients: [
        "1 Une belle araignée de mer",
        "1 Grande quantité d'eau",
        "Quelques aromates dont un bouquet garni (facultatif)",
        "Du gros Sel",
      ],
      instructions: [
        "Passer l’araignée sous l’eau et la brosser pour enlever toutes les impuretés.",
        "Faire bouillir votre eau dans une cocotte-minute puis y ajouter un peu de gros sel.",
        "Porter le tout à ébullition et ajouter un bouquet garni.",
        "Plonger l’araignée, pattes repliées, dans l’eau bouillante et faire chauffer pendant environ 20 minutes (sans le couvercle).",
        "Lorsque la cuisson est terminée, retirer la cocotte-minute du feu et laisser refroidir quelques minutes.",
        "Retirer l’araignée et déguster.",
      ],
    },
    {
      title: "Sole à la Popo",
      image: "/sole-meuniere.jpg",
      ingredients: [
        "De jolies Soles",
        "Du beurre",
        "Sel, poivre",
        "Crème fraîche",
        "Citron",
      ],
      instructions: [
        "Enlevez les arêtes de chaque côté aux extrémités",
        "Nettoyez-les bien et séchez-les avec du papier absorbant.",
        "Ensuite, passez les dans de la farine à l'aide d'un plat",
        "Dans une poêle, faites fondre du beurre et faites cuire les poissons des deux côtés jusqu'à ce qu'ils soient bien dorés.",
        "Pendant ce temps, dans une petite casserole, faites chauffer de la crème fraîche à feu doux.",
        "Ajoutez un peu de beurre et, juste avant de servir, incorporez un filet de jus de citron.",
        "Pour finir, décorez avec du persil",
      ],
    },
    {
      title: "Soupe de Cresson",
      image: "/cq5dam.web.1410.705.jpg",
      ingredients: [
        "Du beurre",
        "1 botte de cresson",
        "Du beurre",
        "1 botte de cresson",
        "3 pommes de terre",
        "1 échalote",
        "Crème fraîche",
      ],
      instructions: [
        "Lavez et nettoyez le cresson pour enlever les trop grosses tiges.",
        "Épluchez les pommes de terre et détaillez-les en cubes.",
        "Faites fondre doucement du beurre, puis ajoutez l'échalote hachée, ensuite le cresson et les pommes de terre.",
        "Ensuite, lorsque le cresson est fondu, ajoutez de l'eau jusqu'à hauteur.",
        "Lorsque les pommes de terre sont tendres, mixez le tout.",
      ],
    },
  ];
  const handleRecipeClick = (index) => {
    setSelectedRecipe(index);
  };

  return (
    <div>
      <div className="banner">
        <h1 className="titre">Recettes</h1>
        <img
          src="/pexels-photo-3952075.jpeg"
          alt="Bannière"
          className="banner-image"
        />
      </div>
      <div className="recipes-container">
        <div className="recipe-cards">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className={`recipe-card ${
                selectedRecipe === index ? "selected" : ""
              }`}
              onClick={() => handleRecipeClick(index)}
            >
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </div>
          ))}
        </div>

        {selectedRecipe !== null && (
          <div className="recipe-details">
            <img
              src={recipes[selectedRecipe].image}
              alt={recipes[selectedRecipe].title}
            />
            <h2>{recipes[selectedRecipe].title}</h2>

            <div className="ingredients">
              <h4>Ingrédients:</h4>
              <ul>
                {recipes[selectedRecipe].ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="instructions">
              <h4>Instructions:</h4>
              <ol>
                {recipes[selectedRecipe].instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Infos;
