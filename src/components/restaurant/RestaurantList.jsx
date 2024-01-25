import React, { useState } from "react";
import "./RestaurantList.css";
import Modal from "react-modal";
import image1 from "/les_fregates_07673600_141042973.jpg?url";
import image2 from "/comme a la maison.jpg?url";
import image3 from "/53905436.jpg?url";
import image4 from "/RES-sotteville-sur-mer-vale-normande-mache-2022--3-.jpg?url";

const restaurants = [
  {
    name: "Les Frégates",
    address: "3 Digue Jean Corruble, 76450 Veulettes-sur-Mer France",
    hours:
      "Dimanche: 12:00 - 14:00, 19:00 - 21:00, Lun-Sam: 12:00 - 14:00, 19:00 - 21:00",
    description:
      "Le restaurant propose une cuisine traditionnelle terre et mer, des menus de saison inspirés de produits locaux, de poissons de la côte et des fruits de mer.",
    image: image1,
  },
  {
    name: "Comme à la maison",
    address: "26 Rue Victor Hugo, 76980 Veules-les-Roses",
    hours:
      "jeudi fermé, vendredi	09:30–16:00, samedi	09:00–18:00, dimanche	09:30–18:00, lundi	09:30–16:00,  mardi	09:30–16:00, mercredi	Fermé",
    description:
      "Cosy et gourmand Comme à la maison, un salon de thé restaurant accueille sans réservation du petit déjeuner au goûter. Les plats sont confectionnés sur place et devant vous dans la cuisine ouverte.",
    image: image2,
  },
  {
    name: "Le Bristol",
    address: "25 Rue Victor Hugo, 76980 Veules-les-Roses",
    hours:
      "Lundi 	10:00-18:00, Mardi 	10:00-18:00, Mercredi 	Fermé, Jeudi 	10:00-18:00, Vendredi 	10:00-18:00, Samedi 	10:00-18:00, Dimanche 	09:00-18:00",
    description:
      "c'est le moment de faire une pause dans ce restaurant. Tous les visiteurs aiment bien la merveilleuse cuisine française de Le Bristol. Si vous avez faim, venez ici pour un tartare savoureux. Essayez un parfait délicieux. Ici, vous pouvez consommer un café bon.",
    image: image3,
  },
  {
    name: "La Valé Normande",
    address: "4 Place de la libération, 76740 SOTTEVILLE-SUR-MER ",
    hours:
      "Lundi 	Fermé, Mardi 12:00-13:30, Mercredi	12:00-13:30, Jeudi 12:00-13:30, Vendredi 12:00-13:30 19:00-21:00, Samedi	12:00-14:00 19:00-21:00, Dimanche	12:00-14:00",
    description:
      "La cuisine française de ce restaurant offre des repas authentiques. La Valé Normande pourrait vous faire plaisir avec un foie gras cuit à la perfection. Les gourmets disent qu'un parfait est délectable ici. Vous apprecierez un vin délicieux dans ce lieu.",
    image: image4,
  },
];

Modal.setAppElement(document.getElementById("root"));

const RestaurantList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleAddressClick = (address) => {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
      address
    )}`;
    window.open(mapUrl, "_blank");
  };

  const openModal = (event, restaurant) => {
    event.preventDefault();
    setSelectedRestaurant(restaurant);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRestaurant(null);
    setModalIsOpen(false);
  };

  return (
    <div className="restaurant-list-container">
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={index} className="restaurant-item">
            <div className="restaurant-name">
              <strong>{restaurant.name}</strong>
            </div>
            <div className="restaurant-address">
              📍{" "}
              <a
                href="#"
                onClick={() => handleAddressClick(restaurant.address)}
              >
                {restaurant.address}
              </a>
            </div>
            <div className="restaurant-hours">
              ⏱{" "}
              <a href="#" onClick={(event) => openModal(event, restaurant)}>
                Voir les horaires
              </a>
            </div>
            <div className="restaurant-description">
              {restaurant.description}
            </div>
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="modal-content"
      >
        {selectedRestaurant && (
          <>
            <h2>{selectedRestaurant.name}</h2>
            <p>
              {selectedRestaurant.hours.split(", ").map((time, index) => (
                <span key={index}>
                  {time}
                  <br />
                </span>
              ))}
            </p>
            {/* Ajoutez d'autres informations du restaurant ici */}
            <button onClick={closeModal}>Fermer</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default RestaurantList;
