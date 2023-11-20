import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "./peche.css";

function Peche() {
  const photos = [
    "https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_2991.jpg",
    "https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_2994.JPG",
    "https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_2997.jpg",
    "https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_3006.jpg",
    "https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_3012.jpg",
    "https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_8692.jpg",
    "https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_8695.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <header className="banner">
        <motion.img
          src="https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_7079.jpeg"
          alt="Bannière de pêche"
        />
      </header>
      <div className="maree">
        <iframe
          src="http://www.horaire-maree.fr/maree/Veules-les-Roses/"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
      <div className="separator"></div>
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
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <motion.div key={index} className="photo">
            <motion.img
              src={photo}
              alt={`Photo ${index + 1}`}
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        ))}
      </Slider>
    </motion.div>
  );
}

export default Peche;
