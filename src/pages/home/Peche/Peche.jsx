import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "./peche.css";

function Peche() {
  const [displayMaree, setDisplayMaree] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [sectionOpacity, setSectionOpacity] = useState(1);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const toggleSection = () => {
    setDisplayMaree(!displayMaree);
    setSectionOpacity(displayMaree ? 0 : 1);
  };

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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Bannière */}
      <header className="banner">
        <h1 className="titre">PÊCHE</h1>
        <motion.img
          src="https://raw.githubusercontent.com/bef4455/VeulesFront/main/public/IMG_7079.jpeg"
          alt="Bannière de pêche"
        />
      </header>
      <div className="white-box">
        <h2>QU'EST-CE QU'ON PÊCHE ?</h2>
        <p>
          Plongez dans l'expérience de la pêche à la crevette en famille,
          explorez les marées et partagez vos photos de moments authentiques au
          fil de l'eau.
        </p>
      </div>

      {/* Bouton unique pour alterner entre les sections */}
      <div className="toggle-button">
        <button onClick={toggleSection}>
          {displayMaree ? "Histoire de la Pêche" : "Horaire des Marées"}
        </button>
      </div>

      {/* Informations sur les marées */}
      {displayMaree && (
        <motion.section
          className="maree-section"
          initial={{ opacity: initialRender ? 1 : sectionOpacity }}
          animate={{ opacity: displayMaree ? 1 : 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="maree">
            <iframe
              src="https://www.horaire-maree.fr/maree/Veules-les-Roses/"
              frameBorder="0"
              allow="encrypted"
              title="Horaire des marées"
            ></iframe>
          </div>
        </motion.section>
      )}

      {/* Description de la pêche */}
      {(initialRender || !displayMaree) && (
        <motion.section
          className="description-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="description">
            <p>
              La pêche à la grise, c’est grisant.
              <br /> La crevette n’est pas loin quand l’eau n’est pas trop
              glacée.
              <br /> Alors que les flots laissent place au sable, choisis ton
              pousseux et file au devant de la petite grise.
              <br /> Les pieds dans l’eau, le nez au vent, tes pensées
              rejoignent les cieux et l’esprit prend congé…
            </p>
          </div>
        </motion.section>
      )}

      {/* Slider d'images */}
      {(initialRender || !displayMaree) && (
        <motion.section
          className="photo-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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
        </motion.section>
      )}
    </motion.div>
  );
}

export default Peche;
